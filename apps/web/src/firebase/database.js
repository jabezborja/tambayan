import {
    initializeFirestore,
    doc, addDoc, updateDoc,
    getDoc, getDocs, collection,
    onSnapshot, arrayUnion,
    setDoc, query, orderBy, deleteDoc, limit, startAfter, limitToLast
} from 'firebase/firestore';

import app from './clientApp';

const db = initializeFirestore(app, {
    experimentalForceLongPolling: true
});

const addDocument = async (collectionName, doc) => {
    const { id } = await addDoc(collection(db, collectionName), doc);

    return id;
}

const setDocument = async (collectionName, document, id) => {
    const docRef = doc(db, collectionName, id);

    return await setDoc(docRef, document);
}

const deleteDocument = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId);

    return await deleteDoc(docRef);
}

const getDocuments = async (collectionName) => {
    const collectionRef = collection(db, collectionName);

    return await getDocs(query(collectionRef, orderBy("dateCreated", "asc")));
}

const getDocument = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = getDoc(docRef);

    if ((await docSnap).exists()) return (await docSnap).data();

    return false;
}

const updateMessages = async (collectionName, roomId, messageId, update) => {
    const ref = doc(collection(doc(db, collectionName, roomId), "messages"), messageId);

    try {
        await setDoc(ref, update);
        
        return [ true, null ];
    } catch (e) {
        return [ false, e ];
    }
}

const deleteMessage = async (roomId, messageId) => {
    const docRef = doc(db, "rooms", roomId, "messages", messageId);

    const originalMessage = (await getDoc(docRef)).data();

    return await updateDoc(docRef, {
        message: "<b title='The message has been deleted by the User but you can still report this to the admins if it disobeyed the Tambayan rules.'>[MESSAGE REDACTED]</b>",
        originalMessage: originalMessage.message,
        deleted: true
    });
}

const updateBots = async (collectionName, documentId, update) => {
    const ref = doc(db, collectionName, documentId);

    try {
        await updateDoc(ref, { installedBots: arrayUnion(update) });
        
        return [ true, null ];
    } catch (e) {
        return [ false, e ];
    }
}

const updateJoinedUsers = async (collectionName, documentId, update) => {
    const ref = doc(db, collectionName, documentId);

    try {
        await updateDoc(ref, { joinedUsers: arrayUnion(update) });
        
        return [ true, null ];
    } catch (e) {
        return [ false, e ];
    }
}

const listenToMessages = (roomId, func) => {
    const q = query(collection(db, "rooms", `${roomId}`, "messages"), orderBy("dateSent", "asc"), limitToLast(10));

    const unsub = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                func(change.doc.data());
            }
        })
    })

    return unsub;
}

export { db, addDocument, setDocument, getDocuments, getDocument, updateMessages, deleteMessage, updateBots, updateJoinedUsers, listenToMessages }