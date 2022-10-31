import { getFirestore, doc, addDoc, getDoc, getDocs, collection } from 'firebase/firestore';

import app from './clientApp';

const db = getFirestore(app);

const addDocument = async (collectionName, doc) => {
    return await addDoc(collection(db, collectionName), doc);
}

const getDocuments = async (collectionName) => {
    return await getDocs(collection(db, collectionName));
}

const getDocument = async (collectionName, documentName) => {
    const docRef = doc(db, collectionName, documentName);
    const docSnap = getDoc(docRef);

    if ((await docSnap).exists()) return (await docSnap).data();

    return false;
}

export { db, addDocument, getDocuments, getDocument }