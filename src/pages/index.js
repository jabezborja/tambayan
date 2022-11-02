import Head from "next/head";
import { useEffect, useState } from "react";
import { signInWithGithub, signInWithGoogle } from "../firebase/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const App = () => {

  const router = useRouter();

  const [ signingIn, setSigningIn ] = useState(false);

  const user = useSelector(state => state.user.user);

  const handleContinueWithGithub = async e => { signInWithGithub(); setSigningIn(true); }
  const handleContinueWithGoogle = async e => { signInWithGoogle(); setSigningIn(true); }
  
  useEffect(() => {
    if (user) {
      router.replace('/t');
    }
  }, [user]);

  return (
    <div className='flex flex-col justify-center px-3 overflow-auto'>

      <Head>
        <title>Tambayan: sa Gedli</title>
        <meta name="description" content="A new chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-10 mx-auto flex flex-col w-10/12 lg:w-5/12">

          <div className="text-center">
              <p className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#DC2424] to-[#4A569D]'>Tambayan: sa Gedli</p>
              <p className='text-xl text-white'>
                An open-source tambayan chat app. Talk with people, make more friends.
              </p>
          </div>

          <div>
            <div>
              {!signingIn
                ? <div className="mt-20 bg-[#292929] w-full py-10 rounded-md">
                    <div className="w-10/12 mx-auto">
                      <p className="text-center text-4xl text-white font-bold">Create an Account</p>
                      <div className="mt-8 flex flex-col space-y-2">
                        <button className='btn flex w-full p-2 rounded-lg h-11 items-center justify-center space-x-2 bg-white font-semibold text-black hover:bg-white/80' onClick={handleContinueWithGoogle}>
                          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                            c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                            c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                            C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                            c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                            c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                          </svg>
                          <p>Google</p>
                        </button>
                        <button className='bg-[#333333] text-white p-2 rounded-lg h-11 font-bold' onClick={handleContinueWithGithub}>GitHub</button>
                      </div>
                    </div>
                  </div>
                : <p className="text-white font-bold text-2xl mt-5">Loading...</p>
              }
              </div>
          </div>

      </div>
    </div>
  );

}

export default App;