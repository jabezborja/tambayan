import { useState } from 'react';
import Head from 'next/head';

import Home from '../components/home';
import Chat from '../components/chat';

const App = () => {

  const [ loggedIn, setLoggedIn ] = useState(false);

  return (
    <div className='h-screen flex flex-col justify-center mx-3'>

      <Head>
        <title>Chat App</title>
        <meta name="description" content="A new chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      { !loggedIn ? <Home /> : <Chat />}
    </div>
  )
}

export default App;