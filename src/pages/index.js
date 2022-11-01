import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { signOutAccount, signInWithGithub, auth, signInWithFacebook } from "../firebase/auth";

import CreateRoomModal from "../components/createRoomModal";
import Room from "../components/room";

const App = () => {

  const [ signedIn, setSignedIn ] = useState(false);
  const [ signingIn, setSigningIn ] = useState(false);

  const [ rooms, setRooms ] = useState([]);
  const [ showCreateRoomModal, setShowCreateRoomModal ] = useState(false);

  const user = useSelector(state => state.user.user);

  useEffect(() => {
      fetch('/api/rooms/getRooms')
          .then((res) => res.json())
          .then((data) => {
              setRooms([]);

              data.rooms.forEach((room) => {
                  setRooms(val => [...val, room])
              })
          });

      if (user) {
        setSigningIn(false);
        setSignedIn(true);
      }
      
  }, [user])

  const handleContinueWithGithub = async e => { signInWithGithub(); setSigningIn(true); }
  const handleContinueWithFacebook = async e => { signInWithFacebook(); setSigningIn(true); }

  const handleLogout = async (e) => {
      const logout = signOutAccount();

      logout.then(() => {
          if (logout) setSignedIn(false);
      });
  }

  return (

    <div className='flex flex-col justify-center px-3 overflow-auto'>

      <Head>
        <title>Chat App</title>
        <meta name="description" content="A new chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      { showCreateRoomModal ? <CreateRoomModal state={setShowCreateRoomModal} /> : <></> }

      <div className="mt-10 w-fit mx-auto flex flex-col">

          <div className="text-center">
              <p className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#DC2424] to-[#4A569D]'>Tambayan: sa Gedli</p>
              <p className='text-xl text-white'>
                An open-source tambayan chat app. Talk with people, make more friends.
              </p>
          </div>

          <div>
              { signedIn
                  ? <div>
                      <div className="mt-4">
                        {user ? <p className="text-3xl font-bold text-white">Hello, {user.displayName} 👋</p> : ''}
                        <div className="w-max space-x-2 flex">
                            <button className=' mt-5 bg-[#4d4d4d] text-white p-2 rounded-lg' onClick={() => setShowCreateRoomModal(true)}>Create New Tambayan</button>
                            <button className=' mt-5 bg-[#4d4d4d] text-white p-2 rounded-lg' onClick={handleLogout}>Logout</button>
                        </div>
                      </div>
                      <div className="my-5 w-full text-white">
                          <p className="text-xl font-bold text-start">Explore other public tambayan</p>

                          <div className="mt-3 flex flex-col space-y-3">
                              { rooms.map((room, i) => <Room key={i} room={room} />) }
                          </div>
                      </div>
                  </div>
                  : <div>
                      {!signingIn
                        ? <div className="mt-20 bg-[#292929] w-full py-10 rounded-md">
                            <div className="w-10/12 mx-auto">
                              <p className="text-center text-4xl text-white font-bold">Create an Account</p>
                              <div className="mt-8 flex flex-col space-y-2">
                                <button className='bg-[#4572d3] text-white p-2 rounded-lg h-11 font-bold' onClick={handleContinueWithFacebook}>Facebook</button>
                                <button className='bg-[#333333] text-white p-2 rounded-lg h-11 font-bold' onClick={handleContinueWithGithub}>GitHub</button>
                              </div>
                            </div>
                          </div>
                        : <p className="text-white font-bold text-2xl mt-5">Loading...</p>
                      }
                  </div>
              }
          </div>

      </div>
    </div>

  );

}

export default App;