import navStyles from '../styles/Navbar.module.css';
import Link from 'next/link';

export default function Navbar( {...navProps} ) {
  console.log(navProps.currentUser);
  

    return (
    <>
    <div className={navStyles.navbar}>
        <div className={navStyles.navHomeSearchContainer}>
        <Link className={navStyles.navLinkTrue} href="/"><h1 className={navStyles.navTitle}>World Nomad</h1></Link>
          <h2 className={navStyles.navLink}>Search</h2>
        </div>
        <div className={navStyles.navLinksContainer}>
          <Link className={navStyles.navLinkTrue} href="/destinations"><h2 className={navStyles.navLink}>Destinations</h2></Link>
          {navProps.loggedIn ?
          <>
          <Link className={navStyles.navLinkTrue} href={`/${navProps.currentUser}`}><h2 className={navStyles.navLink}>Profile</h2></Link>
          </>
          : 
          <>
          <Link className={navStyles.navLinkTrue} href="/login"><h2 className={navStyles.navLink}>Login</h2></Link>
          <Link className={navStyles.navLinkTrue} href="/register"><h2 className={navStyles.navLink}>Sign Up</h2></Link>
          </>}
        </div>
    </div>
    </>
    )
}