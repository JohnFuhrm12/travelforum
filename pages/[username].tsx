import { useRouter } from "next/router";
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Profile.module.css';
import Navbar from '@/components/navbar';
import Footer from "@/components/footer";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";

export default function profile( {...props} ) {
    const router = useRouter();
    const {username} = router.query;
    ///const {username} = router.query;

    const loggedIn = props.loggedIn;
    const currentUser = props.currentUser;

    const navProps = {
        loggedIn,
        currentUser
    };

    const defaultPic = 'https://res.cloudinary.com/dvmw658s9/image/upload/v1681944855/TravelForum/y12kc5h3bdlvedhmvpom.jpg';

    return ( // <Link href="/destinations/north-america"></Link>
        <>
        <Head>
            <title>World Nomad</title>
        </Head>
        <Navbar {...navProps}/>
        <div className={styles.titleRow}>
            <img className={styles.profilePicture} src={defaultPic}/>
            <h1 className={styles.title}>{username}'s Profile</h1>
        </div>
        <Footer/>
        </>
    )
}