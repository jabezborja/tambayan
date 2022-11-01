import { initializeFirestore, doc, addDoc, updateDoc, getDoc, getDocs, collection, onSnapshot, arrayUnion, setDoc} from 'firebase/firestore';

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

    if (docRef) return;

    return await setDoc(docRef, document);
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

    try {
        await updateDoc(ref, { messages: arrayUnion(update) });
        
        return [ true, null ];
    } catch (e) {
        return [ false, e ];
    }
}

const listenToDocument = (func, collectionName, documentId) => {
    const unsub = onSnapshot(doc(db, collectionName, documentId), (doc) => {
        func(doc);
    })

    return unsub;
}

export { db, addDocument, setDocument, getDocuments, getDocument, updateDocument, listenToDocument }