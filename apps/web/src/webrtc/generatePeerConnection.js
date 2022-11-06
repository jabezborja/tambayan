import { ICE_SERVERS } from "./iceServers";
import { addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/database";

const generateCaller = async (peerConnection, offerDescription, room, answerCandidates, offer) => {
    await peerConnection.setLocalDescription(offerDescription);

    offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
    };

    onSnapshot(room, (snapshot) => {
        const data = snapshot.data();

        if (!peerConnection.currentRemoteDescription && data?.answer) {
            const answerDescription = new RTCSessionDescription(data.answer);
            peerConnection.setRemoteDescription(answerDescription);
        }
    });

    onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const candidate = new RTCIceCandidate(change.doc.data());
                peerConnection.addIceCandidate(candidate);
            }
        })
    });
}

const generateCallee = async (peerConnection, offerDescription, offerCandidates, offer) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answerDescription);

    offer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
    };

    onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const candidate = new RTCIceCandidate(change.doc.data());
                peerConnection.addIceCandidate(candidate);
            }
        })
    })
}

const generatePeerConnection = async (caller, id) => {
    // Create RTC Peer Offer
    const peerConnection = new RTCPeerConnection(ICE_SERVERS);

    const offerCandidates = collection(db, "rooms", id, "offerCandidates");
    const answerCandidates = collection(db, "rooms", id, "answerCandidates");

    const room = doc(db, "rooms", id);
    
    peerConnection.onicecandidate = e => {
        console.log("Candidate: ", e.candidate.toJSON());
        e.candidate && addDoc(
            caller ? collection(room, "offerCandidates") : collection(room, "answerCandidates"),
            e.candidate.toJSON());
    }

    var offer = null;

    const offerDescription = caller
        ? await peerConnection.createOffer()
        : (await getDoc(room)).exists() && (await callDoc).data().roomOffer;

    if (caller) {
        await generateCaller(peerConnection, offerDescription, room, answerCandidates, offer);
    } else {
        await generateCallee(peerConnection, offerDescription, offerCandidates, offer);
    }

    console.log("Success...")

    updateDoc(room, { roomOffer: offer });
}

export default generatePeerConnection;