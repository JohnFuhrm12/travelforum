import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Account.module.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import { db } from '@/firebase';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";
import { useState } from 'react';

export default function Register() {

    const [currentUsername, setCurrentUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');

    const [successMessage, setSuccessMessage] = useState(false);

    const createAccount = async (e:any) => {
        e.preventDefault();
        await setDoc(doc(db, 'users', currentEmail), {
          username: currentUsername,
          password: currentPassword,
          email: currentEmail,
        });
        setCurrentUsername('');
        setCurrentPassword('');
        setCurrentEmail('');
        setSuccessMessage(true);
      };

      function clearMessage() {
        setSuccessMessage(false);
      };

  return (
    <>
    <Head>
      <title>World Nomad</title>
    </Head>
      <Navbar/>
      {successMessage? <h2 className={styles.successMessage}>Success! Account created.</h2> : <></>}
      <form onChange={clearMessage} onSubmit={createAccount} className={styles.registerForm}>
        <h1>Create an Account</h1>
        <label htmlFor="username">Username</label>
        <input onChange={(e) => {setCurrentUsername(e.target.value)}}  className={styles.registerInput} type="text" id="username" name="username" value={currentUsername} placeholder='Username...' required/>
        <label htmlFor="password">Password</label>
        <input onChange={(e) => {setCurrentPassword(e.target.value)}} className={styles.registerInput} type="text" id="password" name="password" value={currentPassword} placeholder='Password...' required/>
        <label htmlFor="email">Email</label>
        <input onChange={(e) => {setCurrentEmail(e.target.value)}} className={styles.registerInput} type="email" id="email" name="email" value={currentEmail} placeholder='Email@gmail.com...' required/>
        <label className={styles.registerInputCheckLabel} htmlFor="terms">I agree to the terms and privacy policy.</label>
        <input className={styles.registerInputCheck} type="checkbox" id="terms" name="terms" value="terms" required/>
        <input className={styles.submitBtn}  type="submit" value="Sign Up"/>
      </form>
      <Footer/>
    </>
  )
}