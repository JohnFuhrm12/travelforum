import navStyles from '../styles/Navbar.module.css';

export default function Navbar() {
    return (
    <>
    <div className={navStyles.navbar}>
        <div className={navStyles.navHomeSearchContainer}>
          <h1 className={navStyles.navTitle}>ForumName</h1>
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