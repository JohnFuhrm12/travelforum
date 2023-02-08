import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from '@/styles/Destinations.module.css';
import Navbar from '../../components/navbar';

export default function continent() {
    const router = useRouter();
    const {contName} = router.query;

    // Get Destination Title From URL
    const titleStr = contName?.toString();
    const titleWords = titleStr?.split('-');
    let titleFromURL = 'destination';
    let titleArr:any = [];

    titleWords?.forEach((word) => {
        let firstChar = '';
        const chars = word.split('');
        firstChar = chars[0].toUpperCase();

        titleFromURL = '';
        titleArr.push(firstChar + chars.slice(1).join(''));
    });

    titleFromURL = titleArr.join(' ');

    return (
        <>
        <Navbar/>
        <h1 className={styles.title}>Explore The {titleFromURL} Forums</h1>
        </>
    )
}
