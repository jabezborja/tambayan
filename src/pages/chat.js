import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { listenToDocument } from '../firebase/database';

const ChatView = () => {

    const router = useRouter();
    const roomId = router.query['room'] || '';

    const user = useSelector(state => state.user.user);

    const [ roomData, setRoomData ] = useState();
    const [ messages, setMessages ] = useState([]);

    const [ message, setMessage ] = useState();

    useEffect(() => {        
        fetch('/api/rooms/getRoom', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ "roomId": roomId })
        })
            .then((res) => res.json())
            .then((data) => {
                setRoomData(data);
                setMessages(data.messages)
            });

        listenToDocument((doc) => {
            var data = doc.data();
            
            setMessages(data.messages)
            setRoomData(data)

        }, "rooms", roomId);
    }, []);

    const sendMessage = (e) => {

        // Temporarily insert the message sent immediately so the user 
        // won't have to wait for the database response before receiving their messages.
        setMessages(old => [...old, {
            roomId: roomId,
            userName: user.displayName,
            senderUid: user.uid,
            message: message
        }])

        fetch('/api/messages/sendMessage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                roomId: roomId,
                userName: user.displayName,
                userId: user.uid,
                message: message
            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data));

        setMessage("");
    };

    return (
        <div className='flex flex-col justify-center'>

            <Head>
                <title>Chat App</title>
                <meta name="description" content="A new chat app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='bg-[#222222] h-screen'>
                <div>
                    <section className='fixed top-0 border-b border-[#4d4d4d] w-screen px-10 py-8 flex justify-between'>
                        <p className='text-xl text-center text-white'>{roomData ? roomData.roomName : "Loading..."}</p>
                        <button className='bg-green-500 text-white rounded-full px-6 py-1'>Call</button>
                    </section>

                    <section className='flex flex-col text-right mt-28 mx-3 mb-24'>
                        {messages
                            ? messages.map((data, i) => <div key={i} className={`flex ${data.senderUid === user.uid ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`flex flex-col ${data.senderUid === user.uid ? 'items-end' : 'items-start'} mt-3`}>
                                    <p className='text-white text-sm'>{data.userName}</p>
                                    <div
                                        className={`mt-1 bg-[#4d4d4d] text-white py-2 px-3 w-fit rounded-md`}
                                    >   
                                        <p className='text-start text-md' dangerouslySetInnerHTML={{ __html: data.message.split(/\n\r?/g).join("<br />") }}></p>
                                        <p className='text-[0.8rem]'>Nov, 2022</p>
                                    </div>
                                </div>
                            </div>)
                            : <></>
                        }

                    </section>

                    <section className='fixed bottom-0 bg-[#222222] border-t border-[#4d4d4d] w-screen px-5 py-5'>
                        <textarea placeholder='Write a message...' value={message} onChange={(e) => setMessage(e.target.value)} className='bg-[#4d4d4d] text-white focus:border-0 focus:ring-0 focus:outline-0 w-9/12 h-10 px-2 rounded-md' type="textarea"></textarea>
                        <button onClick={sendMessage} className='ml-2 bg-[#4d4d4d] text-white rounded-full px-3 py-1'>Send</button>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ChatView;