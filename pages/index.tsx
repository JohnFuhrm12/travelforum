import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <>
      <Navbar/>
      <h1 className={styles.main}>Home</h1>
    </>
  )
}
