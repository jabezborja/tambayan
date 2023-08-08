import {
    collection, where,
    query, getDocs
} from 'firebase/firestore';
import { db } from './database';

const getDeveloperBotsByUserId = async (id) => {
    const q = query(collection(db, "bots"), where("creatorId", "==", id));
    const querySnapshot = await getDocs(q);

    var data = [];

    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });

    return data;
}

const getBotById = async (uid) => {
    const q = query(collection(db, "bots"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot[0].data();

    return data;
}

export { getDeveloperBotsByUserId, getBotById }