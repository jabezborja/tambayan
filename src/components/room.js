import { useRouter } from 'next/router';
import { useState } from 'react';
import PasswordModal from './passwordModal';

const Room = ({ room }) => {
    
    const router = useRouter();

    const [ showPasswordModal, setShowPasswordModal ] = useState();

    const handleRoomEntry = (e) => {
        if (room.isPublic) {
            return router.push('/t/' + room.id);
        }

        setShowPasswordModal(true);
    }

    if (showPasswordModal) return <PasswordModal room={room} state={setShowPasswordModal} />

    return <div onClick={handleRoomEntry} className="hover:cursor-pointer outline outline-1 outline-[#a5a5a5] rounded-lg px-3 py-4">
        <div className="flex justify-between items-center">
            <div>
                <p className="font-bold">{room.roomName}</p>
                <p className="text-[0.7rem]">Hosted by {room.roomOwner.displayName}</p>
                <p><strong>Description:</strong> {room.description}</p>
            </div>
            
            <div className="mr-3">
                {!room.isPublic
                    ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                }
            </div>
        </div>
    </div>;
}

export default Room;