import { useRouter } from "next/router";
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
    const northAmerica = ['Canada', 'United States', 'Mexico'];
    const southAmerica = ['Colombia', 'Venezuela', 'Ecuador', 'Peru', 'Bolivia', 'Brazil', 'Chile', 'Argentina', 'Paraguay', 'Uruguay'];

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
            <h2 className={styles.threadTitle}>Forum</h2>
            {countries.map((country:string, index:number) => {
                return (
                    <>
                    <div className={styles.forumRow}>
                        <h2 className={styles.threadTitle} key={index}>{country}</h2>
                        <h2 className={styles.threadTitle}>Threads: 0</h2>
                    </div>
                    </>
                )
            })}
        </div>
        </>
    )
}
