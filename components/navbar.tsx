import navStyles from '../styles/Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
    return (
    <>
    <div className={navStyles.navbar}>
        <div className={navStyles.navHomeSearchContainer}>
        <Link href="/"><h1 className={navStyles.navTitle}>World Nomad</h1></Link>
          <h2 className={navStyles.navLink}>Search</h2>
        </div>
        <div className={navStyles.navLinksContainer}>
          <h2 className={navStyles.navLink}>Destinations</h2>
          <h2 className={navStyles.navLink}>Sign Up</h2>
          <h2 className={navStyles.navLink}>Login</h2>
        </div>
    </div>
    </>
    )
}