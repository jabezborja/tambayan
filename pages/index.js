import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

export default function Home() {

  var peerInstance = useRef(null);
  var connection = useRef(null);

  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);

  const [ id, setId ] = useState();
  const [ peerId, setPeerId ] = useState();

  const [ peerName, setPeerName ] = useState();

  const [ connected, setConnected ] = useState(false);
  const [ onCall, setOnCall ] = useState(false);
  const [ messagesData, setMessagesData ] = useState([]);

  const [ name, setName ] = useState("");
  const [ connectId, setConnectId ] = useState("");
  const [ message, setMessage ] = useState("");

  const [ requestIncoming, setRequestIncoming ] = useState(false);

  const openConnection = (conn, type) => {
    conn.on('open', function() {
      connection.current = conn;

      if (type === "receiver") setRequestIncoming(true);

      conn.on('data', function(data) {

        // Check if the request is accepted.
        if (data.type === "request") {
          if (data.request == "granted") setConnected(true)
          else {
            conn.close();
            console.log("Request denied.");
          }
        }

        if (data.type === "name") {
          setPeerName(data.name);
        } else if (data.type === "message") {
          setMessagesData(old => [...old, data]);
        }
      });

      conn.send({type: "name", name: name});
    });

    peerInstance.current.on('disconnected', function() {
      setConnected(false);
    })
  }

  useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
      const peer = new Peer();

      peer.on('open', function(id)  {
        setId(id);
      });

      // Receiving connection
      peer.on('connection', function(conn) {
        openConnection(conn, "receiver");
      });

      // Receiving call
      peer.on('call', function(call) {
        setOnCall(true);
        
        var getUserMedia = navigator.mediaDevices.getUserMedia
          || navigator.getUserMedia
          || navigator.webkitGetUserMedia
          || navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, (mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();

          call.answer(mediaStream);

          call.on('stream', function(remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream
            remoteVideoRef.current.play();
          });
        });
      });

      peerInstance.current = peer;
    })
  }, []);

  const connect = (e) => {
    var conn = peerInstance.current.connect(connectId);
    setPeerId(connectId);

    openConnection(conn, "sender");
  }

  const evalRequest = (accepted) => {
    if (accepted) setConnected(true);
    else setRequestIncoming(false);

    return accepted
      ? connection.current.send({ id: id, type: "request", request: "granted" })
      : connection.current.send({ id: id, type: "request", request: "denied"});
  }

  const sendChat = (e) => {
    const data = { id: id, type: "message", message: message };

    setMessagesData(old => [...old, data])
    connection.current.send(data);
  }

  const call = () => {
    setOnCall(true);

    var getUserMedia = navigator.getUserMedia 
      || navigator.mediaDevices.getUserMedia
      || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {

      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      console.log(peerId);

      const call = peerInstance.current.call(peerId, mediaStream);

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  }

  if (!connected) return (
    <>
      {requestIncoming ? <div>
        <div className="relative z-10">

          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-5 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Someone wants to chat with you.</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Someone has requested you via your Peer ID to have a conversation with you. Do you want to accept?</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={() => evalRequest(true)} className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Accept</button>
                  <button type="button" onClick={() => evalRequest(false)} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Deny</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> : <></>}

      <div className='h-screen flex flex-col justify-center mx-3'>

        <div className='mb-10'>
          <p className='text-6xl font-bold'>Peer-to-Peer Chat App</p>
          <p className='text-xl'>by Jabez Torre</p>
        </div>

        <div>
          <p>Your ID: {id}</p>
          
          <div>
            <div className='mt-3'>
              <label htmlFor="name">Your name</label>
              <input name="name" onChange={(e) => {setName(e.target.value)}} className='w-full h-10 px-2 border border-[#222222] rounded-md' type="textarea"></input>
            </div>
            <div className='mt-3'>
              <label htmlFor="peer-id">Enter another peer's ID</label>
              <input name="peer-id" onChange={(e) => {setConnectId(e.target.value)}} className='w-full h-10 px-2 border border-[#222222] rounded-md' type="textarea"></input>
            </div>

            <button className='mt-5 bg-[#222222] text-white w-full py-2 rounded-lg' onClick={connect}>Connect</button>
          </div>
        </div>
      </div>
    </>
  )

  if (onCall) {
    return (
      <div>
        <div>
          <video ref={currentUserVideoRef} />
        </div>
        <div>
          <video ref={remoteVideoRef} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="A new chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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

        <section className='w-full mx-5 fixed bottom-0 mb-5'>
          <input onChange={(e) => {setMessage(e.target.value)}} className='w-10/12 h-10 px-2 border border-[#222222] rounded-md' type="textarea"></input>
          <button className='ml-2' onClick={sendChat}>Send</button>
        </section>
      </main>
    </div>
  )
}
