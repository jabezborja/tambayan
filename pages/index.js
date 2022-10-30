import { useState, useEffect, useRef } from 'react';

import Head from 'next/head';

import RequestModal from '../components/requestModal';
import Chat from '../components/chat';

export default function Home() {

  var peerInstance = useRef(null);
  var connection = useRef(null);

  const [ id, setId ] = useState();
  const [ peerId, setPeerId ] = useState();

  const [ name, setName ] = useState("");
  const [ peerName, setPeerName ] = useState();

  const [ connected, setConnected ] = useState(false);
  const [ requestIncoming, setRequestIncoming ] = useState(false);

  const [ connectId, setConnectId ] = useState("");

  useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
      const peer = new Peer({
        config: {
          iceServers: [
            { url: 'turn:13.250.13.83:3478?transport=udp', credential: 'YzYNCouZM1mhqhmseWk6'},
            { url: 'stun:stun.l.google.com:19302' }
          ]
        }
      });

      peer.on('open', (id) => {
        setId(id);
      });

      // Receiving connection
      peer.on('connection', (conn) => {
        conn.on('open', () => {
          setRequestIncoming(true);

          // Wait for sender's responses
          conn.on('data', (data) => {
            if (data.type === "name") setPeerName(data.name);
          });

          conn.send({ type: "name", name: name });

          connection.current = conn;
        })
      });

      peerInstance.current = peer;
    })
  }, []);

  const connect = () => {
    var conn = peerInstance.current.connect(connectId);
    setPeerId(connectId);

    conn.on('open', () => {
      connection.current = conn;

      // Wait for receiver's responses
      conn.on('data', (data) => {
        if (data.type === "name") setPeerName(data.name)

        if (data.type === "request") {
          if (data.request == "granted") setConnected(true);
          else {
            conn.close();
            console.log("Request denied.");
          }
        }
        
      });

      conn.send({type: "name", name: name});
    });
  }

  const evalRequest = (accepted) => {
    // Evaluate the request and send a `request` response to the sender.

    if (accepted) setConnected(true);
    else setRequestIncoming(false);

    return accepted
      ? connection.current.send({ id: id, type: "request", request: "granted" })
      : connection.current.send({ id: id, type: "request", request: "denied" });
  }

  if (connected) return <Chat id={id} peerId={peerId} peerName={peerName} connection={connection} />

  return (
    <div className='h-screen flex flex-col justify-center mx-3'>

      <Head>
        <title>Chat App</title>
        <meta name="description" content="A new chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {requestIncoming ? <RequestModal evalRequest={evalRequest} /> : <></>}

      <div className='mb-10'>
        <p className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#DC2424] to-[#4A569D]'>Peer-to-Peer<br/>Chat App</p>
        <p className='text-xl'>
          by <a className='group transition-all duration-300 ease-in-out font-bold text-blue-600' href='https://jabeztorre.ga' target="_blank" rel="noreferrer">
            <span className='bg-left-bottom bg-gradient-to-r from-blue-500 to-blue-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
              Jabez Torre
            </span>
          </a>
        </p>
      </div>

      <div>
        <p>Your ID: <span className='font-bold'>{id ? id : "Generating UID, please wait..."}</span></p>
        
        <div>
          <div className='mt-3'>
            <label htmlFor="name">Your name</label>
            <input name="name" onChange={(e) => {setName(e.target.value)}} className='w-full h-10 px-2 border border-[#222222] rounded-md' type="textarea"></input>
          </div>
          <div className='mt-3'>
            <label htmlFor="peer-id">Enter another peer's ID</label>
            <input name="peer-id" onChange={(e) => {setConnectId(e.target.value)}} className='w-full h-10 px-2 border border-[#222222] rounded-md' type="textarea"></input>
          </div>

          <button onClick={() => connect()} className='mt-5 bg-[#222222] text-white w-full py-2 rounded-lg'>Connect</button>
        </div>
      </div>
    </div>
  )
}

// if (onCall) {
  //   return (
  //     <div>
  //       <div>
  //         <video ref={currentUserVideoRef} />
  //       </div>
  //       <div>
  //         <video ref={remoteVideoRef} />
  //       </div>
  //     </div>
  //   );
  // }


// const call = () => {
  //   setOnCall(true);

  //   var getUserMedia = navigator.getUserMedia 
  //     || navigator.mediaDevices.getUserMedia
  //     || navigator.webkitGetUserMedia
  //     || navigator.mozGetUserMedia;

  //   getUserMedia({ video: true, audio: true }, (mediaStream) => {

  //     currentUserVideoRef.current.srcObject = mediaStream;
  //     currentUserVideoRef.current.play();

  //     console.log(peerId);

  //     const call = peerInstance.current.call(peerId, mediaStream);

  //     call.on('stream', (remoteStream) => {
  //       remoteVideoRef.current.srcObject = remoteStream;
  //       remoteVideoRef.current.play();
  //     });
  //   });
  // }

  // Receiving call
  // peer.on('call', function(call) {
  //   setOnCall(true);
    
  //   var getUserMedia = navigator.mediaDevices.getUserMedia
  //     || navigator.getUserMedia
  //     || navigator.webkitGetUserMedia
  //     || navigator.mozGetUserMedia;

  //   getUserMedia({ video: true, audio: true }, (mediaStream) => {
  //     currentUserVideoRef.current.srcObject = mediaStream;
  //     currentUserVideoRef.current.play();

  //     call.answer(mediaStream);

  //     call.on('stream', function(remoteStream) {
  //       remoteVideoRef.current.srcObject = remoteStream
  //       remoteVideoRef.current.play();
  //     });
  //   });
  // });