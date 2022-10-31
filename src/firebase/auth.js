import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../slices/userSlice';
import store from '../store';
import app from './clientApp';

const auth = getAuth(app);

const signInAnon = async () => {
    await signInAnonymously(auth)
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.log(err.code, err.message);

            return false;
        })
}

onAuthStateChanged(auth, (u) => {
    if (u) {
        store.dispatch(setUser(u));
    } else {
        store.dispatch(setUser(null));
    }
});

export { signInAnon, auth };