import { initializeFirestore, doc, addDoc, updateDoc, getDoc, getDocs, collection, onSnapshot, arrayUnion} from 'firebase/firestore';

import app from './clientApp';

const db = initializeFirestore(app, {
    experimentalForceLongPolling: true
});

const addDocument = async (collectionName, doc) => {
    return await addDoc(collection(db, collectionName), doc);
}

const getDocuments = async (collectionName) => {
    return await getDocs(collection(db, collectionName));
}

const getDocument = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = getDoc(docRef);

    if ((await docSnap).exists()) return (await docSnap).data();

    return false;
}

const updateDocument = async (collectionName, documentId, update) => {
    const ref = doc(db, collectionName, documentId);

    await updateDoc(ref, { messages: arrayUnion(update) });
}

const listenToDocument = (func, collectionName, documentId) => {
    const unsub = onSnapshot(doc(db, collectionName, documentId), (doc) => {
        func(doc);
    })

    return unsub;
}

export { db, addDocument, getDocuments, getDocument, updateDocument, listenToDocument }