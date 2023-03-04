import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import destinationStyles from '@/styles/Destinations.module.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";

export default function Home( {...props} ) {

  // State
  const [threads, setThreads]:any = useState([]);
  const threadsCount = threads.length;

  useEffect(() => {
    getDbmessages();
    console.log(props.currentUser);
  }, []);

  // Get All Threads
  const threadsRef = collection(db, "threads");

  const getDbmessages = async () => {
      const itemsRef = query(threadsRef);
      const currentQuerySnapshot = await getDocs(itemsRef);
      setThreads(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };

  return (
    <>
    <Head>
      <title>World Nomad</title>
    </Head>
      <Navbar/>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>World Nomad Travel Forums</h1>
        <h1 className={styles.subTitle}>Welcome to The Forums!</h1>
      </div>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Browse by Destination</h2>
        <div className={styles.destinationsRow}>
            <div className={styles.destinationContainer}>
                <Link href="/destinations/north-america"><img className={styles.destinationImg} src='https://res.cloudinary.com/dvmw658s9/image/upload/v1675809170/TravelForum/n4kht92izyd7ztntyx3j.jpg'/></Link>
                <Link className='link' href="/destinations/north-america"><h2 className={styles.destinationTitle}>North America</h2></Link>
            </div>
            <div className={styles.destinationContainer}>
                <Link href="/destinations/south-america"><img className={styles.destinationImg} src='https://res.cloudinary.com/dvmw658s9/image/upload/v1675809170/TravelForum/iprmfohgww9zu3li6pgw.jpg'/></Link>
                <Link className='link' href="/destinations/south-america"><h2 className={styles.destinationTitle}>South America</h2></Link>
            </div>
            <div className={styles.destinationContainer}>
                <Link href="/destinations/europe"><img className={styles.destinationImg} src='https://res.cloudinary.com/dvmw658s9/image/upload/v1675809170/TravelForum/pe4p1giqdvoj2ysd97y0.jpg'/></Link>
                <Link className='link' href="/destinations/europe"><h2 className={styles.destinationTitle}>Europe</h2></Link>
            </div>
        </div>
        <div className={styles.destinationsRow}>
            <div className={styles.destinationContainer}>
                <Link href="/destinations/africa"><img className={styles.destinationImg} src='https://res.cloudinary.com/dvmw658s9/image/upload/v1675809169/TravelForum/awhuanmshdhga84xv4iq.webp'/></Link>
                <Link className='link' href="/destinations/africa"><h2 className={styles.destinationTitle}>Africa</h2></Link>
            </div>
            <div className={styles.destinationContainer}>
                <Link href="/destinations/asia"><img className={styles.destinationImg} src='https://res.cloudinary.com/dvmw658s9/image/upload/v1675809169/TravelForum/xtqyqf0znngejsgab6nk.jpg'/></Link>
                <Link className='link' href="/destinations/asia"><h2 className={styles.destinationTitle}>Asia</h2></Link>
            </div>
            <div className={styles.destinationContainer}>
                <Link href="/destinations/oceania"><img className={styles.destinationImg} src='https://res.cloudinary.com/dvmw658s9/image/upload/v1675809169/TravelForum/st8yjbucq3bqoi0whtoo.jpg'/></Link>
                <Link className='link' href="/destinations/oceania"><h2 className={styles.destinationTitle}>Oceania</h2></Link>
            </div>
        </div>
      </div>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>New Threads</h2>
      </div>
      <div className={destinationStyles.countriesContainer}>
      {threads.map((thread:any, index:number) => {
                const sluggedTitle = (thread.title).toString().toLowerCase();
                const countryLowercase = thread.country.toLowerCase();

                return (
                <>
                <div className={destinationStyles.forumRow}>
                    <div className={destinationStyles.forumLeftColumn}>
                    <Link className="link" href={`/destinations/${thread.continent}/${countryLowercase}/${sluggedTitle}`}><h2 key={index} className={destinationStyles.threadTitle}>{thread.title}</h2></Link>
                        <h2 className={destinationStyles.forumSubtitle}>{thread.user}</h2>
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
