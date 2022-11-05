import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMessagesByRoom, listenToMessages } from '../../firebase/database';
import moment from 'moment'
import absoluteUrl from 'next-absolute-url';
import MessageView from '../../components/message';
import PasswordModal from '../../components/passwordModal';
import { truncate } from '../../utils/stringUtils';

export async function getServerSideProps({ params, req }) {

    const { origin } = absoluteUrl(req, req.headers.host);
    
    const { id } = params;

    const room = await fetch(origin + '/api/rooms/getRoom', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ "roomId": id })
    });

    const roomData = await room.json();

    return { props: { roomData, id } }

}

const ChatView = ({ roomData, id }) => {

    const router = useRouter();

    const user = useSelector(state => state.user.user);

    const [ room, setRoom ] = useState();
    const [ messages, setMessages ] = useState([]);
    const [ selectedMessageIndex, setSelectedMessageIndex ] = useState(-1);
    const [ showPasswordModal, setShowPasswordModal ] = useState();

    const [ message, setMessage ] = useState('');
    const [ replyingTo, setReplyingTo ] = useState(null);

    const textInput = useRef(null);
    const autoScroller = useRef(null);

    useEffect(() => {

        if (!user) {
            alert("You must login to enter this tambayan room.");

            router.replace('/');
            return () => {}
        }

        if (!roomData.isPublic && user.uid !== roomData.roomOwner.uid) {
            setShowPasswordModal(true);
        }

        getMessagesByRoom(id)
            .then((messages) => {
                messages.forEach((message) => {
                    setMessages(prevState => [...prevState, message.data()])
                })
            })

        setRoom(roomData);

        const messageListener = listenToMessages(id, (messages) => {            
            setMessages(messages);
        });

        return () => {
            messageListener();
        }

    }, []);

    useEffect(() => {
        if (autoScroller.current) autoScroller.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleMessage = e => {
        if (e.key === "Enter" && e.shiftKey) {
            setMessage(message + '\r\n');
        } else if (e.key === "Enter") {
            e.target.form.requestSubmit();
        }
    }

    const handleCancelLinebreak = e => {
        if (e.nativeEvent.inputType === "insertLineBreak") return;

        setMessage(e.target.value);
    }

    const sendMessage = async e => {

        e.preventDefault();

        // Temporarily append `message` data for user to know that their message is still sending.
        setMessages(old => [...old, {
            dateSent: moment().toDate(),
            message: "Sending message: " + message,
            messageId: "message_sending",
            repliedTo: messages[replyingTo],
            user: user
        }])

        setMessage("");
        setReplyingTo(null);

        if (replyingTo) {
            messages[replyingTo].message = truncate(messages[replyingTo].message)
        }

        console.log(messages[replyingTo])

        await fetch('/api/messages/sendMessage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                roomId: id,
                user: user,
                moderator: user.uid === room.roomOwner.uid,
                repliedTo: replyingTo ? messages[replyingTo] : null,
                message: message
            })
        });
        
    };

    if (showPasswordModal) return <PasswordModal room={room} state={setShowPasswordModal} />

    return (
        <div className='flex flex-col justify-center h-screen'>

            <Head>
                <title>Tambayan: {room ? room.roomName : ' sa Gedli'}</title>
                <meta name="description" content="A new chat app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className='h-fit bg-[#1a1a1a] border-b border-[#3d3d3d] w-screen py-8 flex justify-between'>
                <div className='mx-5 md:mx-10 flex justify-between items-center w-full text-center md:text-start text-xl '>
                    <button onClick={() => router.back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    {room
                        ? room.isPublic
                            ? <p>{room.roomName} by <span className='font-bold'>{room.roomOwner.displayName}</span></p>
                            : `${room.roomName} - Private Tambayan`
                        : "Loading..."
                    }
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </button>
                </div>
            </section>

            <div className='bg-[#1a1a1a] overflow-auto h-5/6'>
                <div className='flex flex-col text-right mx-3 my-2'>
                    { messages.map((message, i) => 
                        <MessageView
                            key={i}
                            index={i}
                            roomId={id}
                            data={message}
                            user={user}
                            textInput={textInput}
                            selectedMessageIndex={{ selectedMessageIndex, setSelectedMessageIndex }}
                            setReplyingTo={setReplyingTo}
                        />) }
                </div>

                <div ref={autoScroller}></div>
            </div>

            <div className='h-fit bg-[#1a1a1a] border-t border-[#3d3d3d]'>
                {replyingTo
                    && <div className='mx-5 my-5 flex flex-row-reverse items-center justify-between'>
                        <button onClick={() => setReplyingTo(null)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <p className=''>Replying to <b>{messages[replyingTo].user.displayName}</b></p>
                    </div>
                }

                <form className='bg-[#2a2a2a] w-screen flex h-14' onSubmit={sendMessage}>
                    <textarea required placeholder='Write a message...' ref={textInput} value={message} onChange={handleCancelLinebreak} onKeyUp={handleMessage} className='bg-[#2a2a2a]  resize-none overflow-hidden focus:border-0 focus:ring-0 focus:outline-0 w-9/12 md:w-11/12 p-3'></textarea>
                    {message && <button type='submit' className='flex justify-center items-center space-x-2 bg-[#2a2a2a]  w-3/12 md:w-1/12'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        <p>Send</p>
                    </button>}
                </form>
            </div>
        </div>
    )
}

export default ChatView;