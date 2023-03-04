import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Account.module.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import { db } from '@/firebase';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";
import { useState } from 'react';

export default function Register( {...props} ) {
    const [errorMessage, setErrorMessage] = useState(false);

    const [currentUsername, setCurrentUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    
    const [realUsername, setRealUsername] = useState('');
    const [realPassword, setRealPassword] = useState('');

    const [credentials, setCredentials] = useState([]);
    const usersRef = collection(db, "users");

    const getCredentials = async () => {
        const usernameRef = query(usersRef, where('username', '==', currentUsername));
        const currentQuerySnapshot = await getDocs(usernameRef);
        setCredentials(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

        credentials.map((cred:any) => {
            setRealUsername(cred.username);
            setRealPassword(cred.password);
        });
  };

    const login = async (e:any) => {
        getCredentials();
        if (currentUsername === realUsername && currentPassword === realPassword) {
            props.setLoggedIn(true);
            props.setCurrentUser(realUsername);
            e.preventDefault();
            console.log(currentUsername);
          }
          else {
            setErrorMessage(true);
            e.preventDefault();
          };
    };

    function clearMessage() {
        setErrorMessage(false);
      };

  return (
    <>
    <Head>
      <title>World Nomad</title>
    </Head>
      <Navbar/>
      {errorMessage? <h2 className={styles.errorMessage}>Incorrect username or password!</h2> : <></>}
      <form onChange={clearMessage} onSubmit={login} className={styles.loginForm}>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input onChange={(e) => {setCurrentUsername(e.target.value)}}  className={styles.registerInput} type="text" id="username" name="username" value={currentUsername} placeholder='Username...' required/>
        <label htmlFor="password">Password</label>
        <input onChange={(e) => {setCurrentPassword(e.target.value)}} className={styles.registerInput} type="text" id="password" name="password" value={currentPassword} placeholder='Password...' required/>
        <input className={styles.submitBtn}  type="submit" value="Login"/>
      </form>
      <Footer/>
    </>
  )
}