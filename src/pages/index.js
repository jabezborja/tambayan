import Head from 'next/head';

import Home from '../components/home';

const App = () => {

  return (
    <div className='h-screen flex flex-col justify-center mx-3'>

      <Head>
        <title>Chat App</title>
        <meta name="description" content="A new chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </div>
  )
}

export default App;