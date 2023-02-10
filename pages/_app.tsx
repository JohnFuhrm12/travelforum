import '@/styles/globals.css';
import type { AppProps } from 'next/app'
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const props = {
    loggedIn,
    setLoggedIn,
    currentUser,
    setCurrentUser
  };

  return <Component {...pageProps}  {...props} />
}
