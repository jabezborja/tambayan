import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { signInAnon } from "../firebase/auth";

const Home = () => {

    const router = useRouter();

    const [ signedIn, setSignedIn ] = useState();

    const [ roomName, setRoomName ] = useState();
    const [ rooms, setRooms ] = useState([]);

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
        
        if (user) setSignedIn(true);
        
    }, [user])

    const handleStart = async (e) => {
        const signIn = signInAnon();

        signIn.then(() => {
            if (signIn) setSignedIn(true);
        });
    }

    const handleCreateRoom = (e) => {

        fetch('/api/rooms/addRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomName: roomName,
                dateCreated: new Date()
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    router.push("/chat?room=" + data.roomId);
                }
            });

    }


    return (
        <div className="w-fit mx-auto flex flex-col h-screen">
            <div className='mt-10 mb-10'>
                <p className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#DC2424] to-[#4A569D]'>Party Chat App</p>
                <p className='text-xl text-white'>
                by <a className='group transition-all duration-300 ease-in-out font-bold text-blue-600' href='https://jabeztorre.ga' target="_blank" rel="noreferrer">
                    <span className='bg-left-bottom bg-gradient-to-r from-blue-500 to-blue-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                    Jabez Torre
                    </span>
                </a>
                </p>
            </div>

            <div className="w-3/12">

                <div>
                    {!signedIn
                        ? <div className='mt-3 text-white'>
                            <label htmlFor="name">Your name</label>
                            <input placeholder="Juan Dela Cruz" name="name" className='bg-[#4d4d4d] w-fit h-10 px-2 mt-1 rounded-md' type="textarea"></input>
                        </div>
                        : <div>
                            <div className='mt-3 text-white'>
                                <label htmlFor="name">Room Name</label>
                                <input placeholder="Let's party chat!" value={roomName} onChange={(e) => setRoomName(e.target.value)} name="name" className='bg-[#4d4d4d] w-fit h-10 px-2 mt-1 rounded-md' type="textarea"></input>
                            </div>
                        </div>
                    }
                </div>

                <div className="w-max space-x-2 flex">
                    {!signedIn
                        ? <button className='mt-5 bg-[#4d4d4d] text-white p-2 rounded-lg' onClick={handleStart}>Join the Parties!</button>
                        : <button className=' mt-5 bg-[#4d4d4d] text-white p-2 rounded-lg' onClick={handleCreateRoom}>Create New Room</button>
                    }
                </div>
            </div>

            { signedIn
                ? <div className="my-5 w-full text-white">
                    <p className="text-xl font-bold text-start">Explore other public chatrooms</p>

                    <div className="mt-3 flex flex-col space-y-3">
                        { rooms.map((room, i) => <Link key={i} href={`/chat?room=${room.id}`}>
                            <div className="hover:pointer outline outline-1 outline-[#a5a5a5] rounded-lg px-3 py-4">
                                <p className="font-bold">{room.roomName}</p>
                                <p>Click to join room</p>
                            </div>
                        </Link>) }
                    </div>
                </div>
                : <p className="text-white mt-3">Loading parties...</p>
            }
        </div>
    );
}

export default Home;