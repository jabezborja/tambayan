import { useRouter } from 'next/router';

const Room = ({ room }) => {
    
    const router = useRouter();
    const handleGoToRoom = () => router.push('/t/' + room.id);

    return <div onClick={handleGoToRoom} className="px-7 py-7 bg-[#2a2a2a] rounded-md hover:cursor-pointer">
        <div className="flex justify-between items-center">
            <div>
                <p className="font-bold text-xl">{room.roomName}</p>
                <p className='text-lg'>Hosted by <b>{room.roomOwner.displayName}</b></p>
                
                <p className='mt-3 text-md'>{room.description}</p>
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