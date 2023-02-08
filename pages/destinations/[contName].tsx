import { useRouter } from "next/router";
import Head from 'next/head';
import Link from 'next/link';
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

    // Countries Lists
    let countries:any = [];

    const northAmerica = [
        {countryName: 'Canada', flag:'https://res.cloudinary.com/dvmw658s9/image/upload/v1675827370/TravelForum/Flags/aoqtpzleortlxjltyvvj.png'},
        {countryName: 'USA', flag:'https://res.cloudinary.com/dvmw658s9/image/upload/v1675827633/TravelForum/Flags/ezzkrmyvrsugkc16hcxk.png'},
        {countryName: 'Mexico', flag:'https://res.cloudinary.com/dvmw658s9/image/upload/v1675827369/TravelForum/Flags/x3vkn2pbimujpnh2prtm.png'}
    ];

    const southAmerica = [
        {countryName: 'Colombia', flag: 'https://res.cloudinary.com/dvmw658s9/image/upload/v1675826526/TravelForum/Flags/jvmavgx7wepfu0870tgf.png'},
        {countryName: 'Venezuela', flag: 'https://res.cloudinary.com/dvmw658s9/image/upload/v1675827214/TravelForum/Flags/r24w9p4pzvwq85la8tuq.png'},
        {countryName: 'Ecuador', flag: 'https://res.cloudinary.com/dvmw658s9/image/upload/v1675826526/TravelForum/Flags/mgqqu2nptatg4rmy1c6w.png'},
        {countryName: 'Peru', flag: 'https://res.cloudinary.com/dvmw658s9/image/upload/v1675826527/TravelForum/Flags/jbt59rjendc9xalwzixc.png'},
        {countryName: 'Bolivia', flag: 'https://res.cloudinary.com/dvmw658s9/image/upload/v1675826526/TravelForum/Flags/l5qsdwjn1faqmxhx57yn.png'},
        {countryName: 'Brazil', flag: 'https://res.cloudinary.com/dvmw658s9/image/upload/v1675826526/TravelForum/Flags/zjqxttlocdbjekd30q2s.png'},
        {countryName: 'Chile', flag: 'https://res.cloudinary.com/dvmw658s9/image/upload/v1675826526/TravelForum/Flags/x1qf3rii2fn7b4qedtma.png'},
        {countryName: 'Argentina', flag: 'https://res.cloudinary.com/dvmw658s9/image/upload/v1675826526/TravelForum/Flags/xdicxiezqpqrkvaqpzw1.png'},
        {countryName: 'Paraguay', flag: 'https://res.cloudinary.com/dvmw658s9/image/upload/v1675826527/TravelForum/Flags/parmex07jhygm3gxqynw.png'},
        {countryName: 'Uruguay', flag: 'https://res.cloudinary.com/dvmw658s9/image/upload/v1675826527/TravelForum/Flags/d7jf940t86kjau6ywnyi.png'}
    ];

    switch (titleFromURL) {
        case 'North America':
            countries = northAmerica;
        break;
        case 'South America':
            countries = southAmerica;
        break;
    };

    return ( // <Link href="/destinations/north-america"></Link>
        <>
        <Head>
            <title>World Nomad</title>
        </Head>
        <Navbar/>
        <h1 className={styles.title}>Explore The {titleFromURL} Forums</h1>
        <div className={styles.linksList}>
            <Link className={styles.smallLink} href="/"><h2>Home</h2></Link>
            <h2 className={styles.linkMarker}>{'>'}</h2>
            <Link className={styles.smallLink} href="/destinations"><h2>Destinations</h2></Link>
            <h2 className={styles.linkMarker}>{'>'}</h2>
            <Link className={styles.smallLink} href="#"><h2>{titleFromURL}</h2></Link>
        </div>
        <div className={styles.countriesContainer}>
            <h2 className={styles.threadTitle}>Country Forums</h2>
            {countries.map((country:any, index:number) => {
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
        </>
    )
}
