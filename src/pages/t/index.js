import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { signOutAccount } from "../../firebase/auth";
import absoluteUrl from 'next-absolute-url';

import CreateRoomModal from '../../components/createRoomModal'
import Room from '../../components/room';

export async function getServerSideProps({ req }) {
    const { origin } = absoluteUrl(req, req.headers.host);

    const res = await fetch(origin + '/api/rooms/getRooms');
    const data = await res.json();

    return { props: { data } }
}

const Explore = ({ data }) => {

    const router = useRouter();

    const [ rooms, setRooms ] = useState([]);
    const [ showCreateRoomModal, setShowCreateRoomModal ] = useState(false);

    const user = useSelector(state => state.user.user);

    useEffect(() => {
        setRooms([]);

        data.rooms.forEach((room) => {
            setRooms(val => [...val, room])
        })
    }, [])

    useEffect(() => {
        if (!user) router.replace('/');
    }, [user]);
    
    const handleLogout = async (e) => await signOutAccount();

    return (
        <div className="mt-10 mx-auto flex flex-col w-10/12 lg:w-5/12">
            <div className="text-center">
                <p className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#DC2424] to-[#4A569D]'>Tambayan: sa Gedli</p>
                <p className='text-xl text-white'>
                    An open-source tambayan chat app. Talk with people, make more friends.
                </p>
            </div>
            <div>
                { showCreateRoomModal ? <CreateRoomModal state={setShowCreateRoomModal} /> : <></> }

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
        </div>
    );
}

export default Explore;