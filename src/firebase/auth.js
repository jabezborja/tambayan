import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import User from '../models/user';
import { setUser } from '../slices/userSlice';
import store from '../store';
import app from './clientApp';
import { getDocument, setDocument } from './database';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
        .then((result) => {

            const userResult = result.user;
            const user = new User(userResult.uid, userResult.displayName, userResult.email, userResult.photoURL);

            console.log(userResult)

            setDocument("users", user.toJson(), userResult.uid);

            return true;

        })
        .catch((err) => {
            console.log(err.code, err.message);

            return false;
        })
}

const signInWithGithub = async () => {
    await signInWithPopup(auth, githubProvider)
        .then((result) => {

            const userResult = result.user;
            const user = new User(userResult.uid, userResult.displayName, userResult.email, userResult.photoURL);

            setDocument("users", user.toJson(), userResult.uid);

            return true;

        })
        .catch((err) => {
            console.log(err.code, err.message);

            return false;
        })
}

const signOutAccount = async () => {
    await signOut(auth)
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.log(err.code, err.message);

            return false;
        })
}

onAuthStateChanged(auth, (u) => {

    console.log(u)

    if (!u) return store.dispatch(setUser(null));

    const user = getDocument("users", u.uid);

    user.then((data) => {
        console.log(data);
        store.dispatch(setUser(data))
    })
});

export { signOutAccount, signInWithGoogle, signInWithGithub, auth };