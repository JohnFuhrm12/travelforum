import { useRouter } from "next/router";
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Destinations.module.css';
import Navbar from '../../../../components/navbar';
import Footer from "@/components/footer";

export default function country() {
    const router = useRouter();
    const {countryName} = router.query;

    let countryChars:any;
    countryChars = countryName?.toString();
    const upperCountryName = countryChars.charAt(0).toUpperCase() + countryChars?.slice(1);

    // Get Continent Name From URL
    const { asPath } = useRouter();
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const URL = `${origin}${asPath}`;
    const continent = URL.split('/')[4];
    const titleWords = continent.split('-');
    let continentTitleFromURL = 'destination';
    let titleArr:any = [];

    titleWords?.forEach((word) => {
        let firstChar = '';
        const chars = word.split('');
        firstChar = chars[0].toUpperCase();

        continentTitleFromURL = '';
        titleArr.push(firstChar + chars.slice(1).join(''));
    });

    continentTitleFromURL = titleArr.join(' ');

    // Countries and Flags Lists
    let countries:any = [];

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
            <Link className={styles.smallLink} href={`/destinations/${continent}`}><h2>{continentTitleFromURL}</h2></Link>
            <h2 className={styles.linkMarker}>{'>'}</h2>
            <Link className={styles.smallLink} href="#"><h2>{upperCountryName}</h2></Link>
        </div>
        <div className={styles.countriesContainer}>
            <h2 className={styles.threadTitle}>Country Forums</h2>
            {countries.map((country:any, index:number) => {
                const sluggedCountryName = (country.countryName).toLowerCase();

                return (
                    <>
                    <div className={styles.forumRow}>
                        <div className={styles.titleImgContainer}>
                            <img className={styles.flagImg} src={country.flag}/>
                            <h2 className={styles.threadTitle} key={index}>{country.countryName}</h2>
                        </div>
                        <h2 className={styles.threadTitle}>Threads: 0</h2>
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