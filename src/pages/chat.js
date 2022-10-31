import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { listenToDocument } from '../firebase/database';

const ChatView = () => {

    const roomId = Router.query['room'] || '';

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
        setMessages(old => [...old, {
            roomId: roomId,
            userName: "Unknown Alienoid",
            senderUid: user.uid,
            message: message
        }])

        fetch('/api/messages/sendMessage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                roomId: roomId,
                userName: "Unknown Alienoid",
                userId: user.uid,
                message: message
            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    return (
        <div className='flex flex-col justify-center mx-3'>

            <Head>
                <title>Chat App</title>
                <meta name="description" content="A new chat app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <div>
                    <section className='fixed top-0 bg-white w-screen px-10 py-8 flex justify-between'>
                        <p className='text-xl text-center'>{roomData ? roomData.roomName : "Loading..."}</p>
                        <button className='bg-green-500 text-white rounded-full px-6 py-1'>Call</button>
                    </section>

                    <section className='flex flex-col text-right mt-5 mx-3 mb-24'>

                        <div className='flex flex-row'>
                            <div
                            className={`mt-1 bg-[#222222] text-white py-2 px-3 w-fit rounded-full`}
                            >
                            <p>Welcome to <span className='font-bold'>{roomData ? roomData.roomName : ""}</span>. Say Hello!</p>
                        </div>
                        </div>

                        {messages
                            ? messages.map((data, i) => <div key={i} className={`flex ${data.senderUid === user.uid ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`flex flex-col ${data.senderUid === user.uid ? 'items-end' : 'items-start'} mt-3`}>
                                    <p className='text-sm'>{data.userName}</p>
                                    <div
                                        className={`mt-1 bg-[#222222] text-white py-2 px-3 w-fit rounded-full`}
                                    >   
                                        <p>{data.message}</p>
                                    </div>
                                </div>
                            </div>)
                            : <></>
                        }

                    </section>

                    <section className='fixed bottom-0 bg-white w-screen px-5 py-5'>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} className='w-9/12 h-10 px-2 border border-[#222222] rounded-md' type="textarea"></input>
                        <button onClick={sendMessage} className='ml-2 bg-[#222222] text-white rounded-full px-3 py-1'>Send</button>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ChatView;