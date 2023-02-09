import { useRouter } from "next/router";
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Destinations.module.css';
import Navbar from '../../../../components/navbar';
import Footer from "@/components/footer";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";

export default function country() {
    const router = useRouter();
    const {countryName} = router.query;
    const {contName} = router.query;

    // State
    const [threads, setThreads]:any = useState([]);
    const threadsCount = threads.length;

    const [continentNameURL, setContinentNameURL]:any = useState('');
    const [continentTitleFromURL, setContinentTitleFromURL]:any = useState('');

    useEffect(() => {
        getDbmessages();
        getContinentName();
    }, []);

    // Check For Invalid Continent Name
    const [attempted, setAttempted] = useState(false);

    useEffect(() => {
        if (continentNameURL === '[contName]') {
            getContinentName();
        };
        if (threadsCount === 0 && !attempted) {
            getDbmessages();
            setAttempted(true);
        };
    });

    // Capitalize Country Name
    let countryChars:any;
    countryChars = countryName?.toString();
    const upperCountryName = countryChars?.charAt(0).toUpperCase() + countryChars?.slice(1);

    // Get Continent Name From URL
    const { asPath } = useRouter();
    let continent:any;

    function getContinentName() {
        const origin =
            typeof window !== 'undefined' && window.location.origin
                ? window.location.origin
                : '';
    
        const URL = `${origin}${asPath}`;
        continent = URL.split('/')[4];
        setContinentNameURL(continent);
        const titleWords = continent?.split('-');
        let titleArr:any = [];
    
        titleWords?.forEach((word:any) => {
            let firstChar = '';
            const chars = word.split('');
            firstChar = chars[0].toUpperCase();
    
            setContinentTitleFromURL('');
            titleArr.push(firstChar + chars.slice(1).join(''));
        });
    
        setContinentTitleFromURL(titleArr.join(' '));
    };

    // Get Country Threads
    const threadsRef = collection(db, "threads");

    const getDbmessages = async () => {
        const itemsRef = query(threadsRef, where('country', '==', upperCountryName));
        const currentQuerySnapshot = await getDocs(itemsRef);
        setThreads(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      };

    return ( // <Link href="/destinations/north-america"></Link>
        <>
        <Head>
            <title>World Nomad</title>
        </Head>
        <Navbar/>
        <h1 className={styles.title}>Explore The {upperCountryName} Forums</h1>
        <div className={styles.linksList}>
            <Link className={styles.smallLink} href="/"><h2>Home</h2></Link>
            <h2 className={styles.linkMarker}>{'>'}</h2>
            <Link className={styles.smallLink} href="/destinations"><h2>Destinations</h2></Link>
            <h2 className={styles.linkMarker}>{'>'}</h2>
            <Link className={styles.smallLink} href={`/destinations/${continentNameURL}`}><h2>{continentTitleFromURL}</h2></Link>
            <h2 className={styles.linkMarker}>{'>'}</h2>
            <Link className={styles.smallLink} href="#"><h2>{upperCountryName}</h2></Link>
        </div>
        <div className={styles.countriesContainer}>
            <h2 className={styles.threadTitle}>{upperCountryName}</h2>
            {threads.map((thread:any, index:number) => {
                const sluggedTitle = (thread.title).toString().toLowerCase();

                return (
                <>
                <div className={styles.forumRow}>
                    <div className={styles.forumLeftColumn}>
                    <Link className="link" href={`/destinations/${contName}/${countryName}/${sluggedTitle}`}><h2 key={index} className={styles.threadTitle}>{thread.title}</h2></Link>
                        <h2 className={styles.forumSubtitle}>{thread.user}</h2>
                     </div>
                </div>
                </>
                )
            })}
        </div>
        <Footer/>
        </>
    )
}

// <Link href="/destinations/north-america"></Link>