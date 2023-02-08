import { useRouter } from "next/router";
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Destinations.module.css';
import Navbar from '../../../../../components/navbar';
import Footer from "@/components/footer";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";

export default function country() {
    const router = useRouter();
    const {countryName} = router.query;
    const {postTitle} = router.query;

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
    let attempts = 0;

    useEffect(() => {
        if (continentNameURL === '[contName]') {
            getContinentName();
        };
        if (threadsCount === 0 && attempts < 1) {
            getDbmessages();
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
        if (postTitle) {
            const itemsRef = query(threadsRef, where('title', '==', postTitle));
            const currentQuerySnapshot = await getDocs(itemsRef);
            setThreads(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
      };

    return ( // <Link href="/destinations/north-america"></Link>
        <>
        <Head>
            <title>World Nomad</title>
        </Head>
        <Navbar/>
        <div className={styles.linksList}>
            <Link className={styles.smallLink} href="/"><h2>Home</h2></Link>
            <h2 className={styles.linkMarker}>{'>'}</h2>
            <Link className={styles.smallLink} href="/destinations"><h2>Destinations</h2></Link>
            <h2 className={styles.linkMarker}>{'>'}</h2>
            <Link className={styles.smallLink} href={`/destinations/${continentNameURL}`}><h2>{continentTitleFromURL}</h2></Link>
            <h2 className={styles.linkMarker}>{'>'}</h2>
            <Link className={styles.smallLink} href={`/destinations/${continentNameURL}/${countryName}`}><h2>{upperCountryName}</h2></Link>
        </div>
        <h1 className={styles.title}>Explore The {upperCountryName} Forums</h1>
        <Footer/>
        </>
    )
}

// <Link href="/destinations/north-america"></Link>