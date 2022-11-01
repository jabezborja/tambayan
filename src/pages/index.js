import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { signOutAccount, signInWithGithub, auth } from "../firebase/auth";

import CreateRoomModal from "../components/createRoomModal";
import Room from "../components/room";

const App = () => {

  const [ signedIn, setSignedIn ] = useState();

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

      if (auth.currentUser) setSignedIn(true);
      if (!user) setSignedIn(false)
      
  }, [auth.currentUser])

  const handleContinueWithGithub = async (e) => {
      const signIn = signInWithGithub();

      signIn.then(() => {
          if (signIn) setSignedIn(true);
      });
  }

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

          <div>
              <p className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#DC2424] to-[#4A569D]'>Party Chat App</p>
              <p className='text-xl text-white'>
              by <a className='group transition-all duration-300 ease-in-out font-bold text-blue-600' href='https://jabeztorre.ga' target="_blank" rel="noreferrer">
                  <span className='bg-left-bottom bg-gradient-to-r from-blue-500 to-blue-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                  Jabez Torre
                  </span>
              </a>
              </p>
          </div>

          <div>
              { signedIn
                  ? <div>
                      <div className="mt-4">
                        <p className="text-3xl font-bold text-white">Hello, {user.displayName} 👋</p>
                        <div className="w-max space-x-2 flex">
                            <button className=' mt-5 bg-[#4d4d4d] text-white p-2 rounded-lg' onClick={() => setShowCreateRoomModal(true)}>Create New Chatroom</button>
                            <button className=' mt-5 bg-[#4d4d4d] text-white p-2 rounded-lg' onClick={handleLogout}>Logout</button>
                        </div>
                      </div>
                      <div className="my-5 w-full text-white">
                          <p className="text-xl font-bold text-start">Explore other public Chatrooms</p>

                          <div className="mt-3 flex flex-col space-y-3">
                              { rooms.map((room, i) => <Room key={i} room={room} />) }
                          </div>
                      </div>
                  </div>
                  : <div>
                      <div className="w-max space-x-2 flex">
                          <button className='mt-5 bg-[#4d4d4d] text-white p-2 rounded-lg' onClick={handleContinueWithGithub}>Continue with GitHub</button>
                      </div>
                  </div>
              }
          </div>

      </div>
    </div>

  );

}

export default App;