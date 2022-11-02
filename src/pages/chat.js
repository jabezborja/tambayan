import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { listenToDocument } from '../firebase/database';
import MessageView from '../components/message';

const ChatView = () => {

    const router = useRouter();
    const { room } = router.query;

    const user = useSelector(state => state.user.user);

    const [ roomData, setRoomData ] = useState();
    const [ messages, setMessages ] = useState([]);

    const [ message, setMessage ] = useState('');

    const autoScroller = useRef(null);

    useEffect(() => {

        if (!user) {
            alert("Please sign in to continue.");

            return () => router.push('/');
        }

        if (!room) return;

        fetch('/api/rooms/getRoom', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ "roomId": room })
        })
            .then((res) => res.json())
            .then((data) => {
                setRoomData(data);
                setMessages(data.messages)
            });

        const unsub = listenToDocument((doc) => {
            var data = doc.data();
            
            setMessages(data.messages)
            setRoomData(data)
    
            autoScroller.current.scrollIntoView({ behavior: 'smooth' })
    
        }, "rooms", room);

        return () => {
            unsub();
        }

    }, [room]);

    const sendMessage = (e) => {

        e.preventDefault();

        // // Temporarily insert the message sent immediately so the user 
        // // won't have to wait for the database response before receiving their messages.
        // setMessages(old => [...old, {
        //     room: room,
        //     userName: user.displayName,
        //     senderUid: user.uid,
        //     message: message
        // }])

        fetch('/api/messages/sendMessage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                roomId: room,
                user: user,
                moderator: user.uid === roomData.roomOwner.uid,
                message: message
            })
        });

        setMessage("");
    };

    return (
        <div className='flex flex-col justify-center h-screen'>

            <Head>
                <title>Tambayan: {roomData ? roomData.roomName : ' sa Gedli'}</title>
                <meta name="description" content="A new chat app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className='h-fit bg-[#222222] border-b border-[#4d4d4d] w-screen pl-10 py-8 flex justify-between'>
                <p className='text-xl text-center text-white'>
                    {roomData
                        ? roomData.isPublic
                            ? <p>{roomData.roomName} by <span className='font-bold'>{roomData.roomOwner.displayName}</span></p>
                            : `${roomData.roomName} - Private Tambayan`
                        : "Loading..."
                    }
                </p>
                {/* <button className='bg-green-500 text-white rounded-full px-6 py-1'>Call</button> */}
            </section>

            <div className='bg-[#222222] overflow-auto h-5/6'>
                <div className='flex flex-col text-right mx-3 my-2'>
                    { messages.map((message, i) => <MessageView key={i} data={message} user={user} />) }
                </div>

                <div ref={autoScroller}></div>
            </div>

            <form className='h-fit bg-[#222222] border-t border-[#4d4d4d] w-screen px-5 py-5 flex' onSubmit={sendMessage}>
                <input required placeholder='Write a message...' value={message} onChange={(e) => setMessage(e.target.value)} className='bg-[#4d4d4d] text-white focus:border-0 focus:ring-0 focus:outline-0 w-9/12 md:w-11/12 h-10 px-2 rounded-md'></input>
                <button type='submit' className='ml-2 bg-[#4d4d4d] text-white rounded-full px-5 py-2 w-3/12 md:w-1/12'>Send</button>
            </form>
        </div>
    )
}

export default ChatView;