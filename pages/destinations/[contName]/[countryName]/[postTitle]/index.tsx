import { useRouter } from "next/router";
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Destinations.module.css';
import threadStyles from '@/styles/Thread.module.css';
import Navbar from '@/components/navbar';
import Footer from "@/components/footer";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";

export default function country() {
    const router = useRouter();
    const {countryName} = router.query;
    const {postTitle} = router.query;

    // State
    const [thread, setThread]:any = useState([]);
    const [comments, setComments]:any = useState([]);

    const [continentNameURL, setContinentNameURL]:any = useState('');
    const [continentTitleFromURL, setContinentTitleFromURL]:any = useState('');

    useEffect(() => {
        getDbmessages();
        getComments();
        getContinentName();
    }, []);

    // Check For Invalid Continent Name
    const [attempted, setAttempted] = useState(false);

    useEffect(() => {
        if (continentNameURL === '[contName]') {
            getContinentName();
        };
        if (thread.length === 0 && !attempted) {
            getDbmessages();
            getComments();
            setAttempted(true);
        };
    });

    // Capitalize Country Name
    let countryChars:any;
    countryChars = countryName?.toString();
    const upperCountryName = countryChars?.charAt(0).toUpperCase() + countryChars?.slice(1);

    // Capitalize Post Name
    let postName:any;
    postName = postTitle?.toString();
    const upperPostName = postName?.charAt(0).toUpperCase() + postName?.slice(1);

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

    // Get Country Thread
    const threadsRef = collection(db, "threads");

    const getDbmessages = async () => {
        if (postTitle) {
            const itemsRef = query(threadsRef, where('title', '==', upperPostName));
            const currentQuerySnapshot = await getDocs(itemsRef);
            setThread(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
      };

    // Get Thread Comments
    const commentsRef = collection(db, "comments");

    const getComments = async () => {
        if (postTitle) {
            const itemsRef = query(commentsRef, where('thread', '==', upperPostName));
            const currentQuerySnapshot = await getDocs(itemsRef);
            setComments(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
      };

    return ( 
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
        <h1 className={styles.title}>{upperPostName}</h1>
        {thread.map((post:any, index:number) => {
            return (
                <>
                <div className={threadStyles.postContainer}>
                    <div className={threadStyles.userImgContainer}>
                        <h2 className={threadStyles.username}>{post.user}</h2>
                    </div>
                    <div className={threadStyles.postBodyContainer}>
                        <h2 className={threadStyles.postBody} key={index}>{post.body}</h2>
                    </div>
                </div>
                </>
            )
        })}
        {comments.map((comment:any, index:number) => {
            return (
                <>
                    <div className={threadStyles.postContainer}>
                    <div className={threadStyles.userImgContainer}>
                        <h2 className={threadStyles.username}>{comment.user}</h2>
                    </div>
                    <div className={threadStyles.postBodyContainer}>
                        <h2 className={threadStyles.postBody} key={index}>{comment.body}</h2>
                    </div>
                </div>
                </>
            )
        })}
        <Footer/>
        </>
    )
}

// <Link href="/destinations/north-america"></Link>