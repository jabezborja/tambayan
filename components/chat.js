import { useEffect, useState } from "react";

function Chat({ id, peerId, peerName, connection }) {

    const [ message, setMessage ] = useState("");
    const [ messagesData, setMessagesData ] = useState([]);

    useEffect(() => {
        connection.current.on('data', (data) => {
            if (data.type === "message") {
                setMessagesData(old => [...old, data]);
            }
        });
    }, [])

    const sendChat = (e) => {
        const data = { id: id, type: "message", message: message };

        setMessagesData(old => [...old, data])
        setMessage("");
        connection.current.send(data);
    }

    return (
        <div>
            <div>
                <section className='flex justify-between mx-10 mt-3'>
                <p className='text-xl text-center'>{peerName ? peerName : "Unknown Alien"}</p>
                <button onClick={() => call()} className='bg-green-500 text-white rounded-full px-6 py-1'>Call</button>
                </section>

                <section className='flex flex-col text-right mt-5 mx-3'>

                    <div className='flex flex-row'>
                        <div
                        className={`mt-1 bg-[#222222] text-white py-2 px-3 w-fit rounded-full`}
                        >
                        <p>You're now chatting <span className='font-bold'>{peerName ? peerName : "an Unknown Alien"}</span>. Say hello!</p>
                    </div>
                    </div>

                {messagesData.map(
                    (data, i) => <div key={i} className={`flex ${data.id === id ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div
                        className={`mt-1 bg-[#222222] text-white py-2 px-3 w-fit rounded-full`}
                        >
                        <p>{data.message}</p>
                    </div>
                    </div>
                )}
                </section>

                <section className='w-screen mx-5 fixed bottom-0 mb-5'>
                    <input value={message} onChange={(e) => {setMessage(e.target.value)}} className={`${message ? 'w-9/12' : 'w-11/12'} h-10 px-2 border border-[#222222] rounded-md`} type="textarea"></input>
                    { message
                        ? <button className='ml-3 bg-[#222222] text-white rounded-full px-5 py-1' onClick={sendChat}>Send</button>
                        : <></> 
                    }
                </section>
            </div>
        </div>
    );
}

export default Chat;