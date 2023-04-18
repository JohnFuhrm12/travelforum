import { useRouter } from "next/router";
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Destinations.module.css';
import Navbar from '@/components/navbar';
import Footer from "@/components/footer";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";

export default function country() {
    const router = useRouter();
    const {username} = router.query;

    return ( // <Link href="/destinations/north-america"></Link>
        <>
        <Head>
            <title>World Nomad</title>
        </Head>
        <Navbar/>
        <h1 className={styles.title}>{username} Profile</h1>
        <Footer/>
        </>
    )
}