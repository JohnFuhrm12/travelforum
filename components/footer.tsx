import footerStyles from '../styles/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
    <>
    <div className={footerStyles.navbar}>
      <h2 className={footerStyles.navLink}>Terms and Conditions</h2>
      <h2 className={footerStyles.navLink}>Privacy Policy</h2>
    </div>
    </>
    )
}