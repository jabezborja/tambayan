import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import User from '../models/user';
import { setUser } from '../slices/userSlice';
import store from '../store';
import app from './clientApp';
import { getDocument, setDocument } from './database';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

onAuthStateChanged(auth, async (u) => {

    if (!u) return store.dispatch(setUser(null));

    const user = await getDocument("users", u.uid);
    store.dispatch(setUser(user))
});

const signInWith = async provider => {
    await signInWithPopup(auth, provider)
        .then((result) => {
            const userResult = result.user;
            const user = new User(userResult.uid, userResult.displayName, userResult.email, userResult.photoURL, false);

            setDocument("users", user.toJson(), userResult.uid);

            return true;
        })
        .catch((err) => false)
}

const signInWithGoogle = async () => signInWith(googleProvider)
const signInWithGithub = async () => signInWith(githubProvider)

const signOutAccount = async () => {
    await signOut(auth)
        .then(() => true)
        .catch((err) => err)
}

export { signOutAccount, signInWithGoogle, signInWithGithub, auth };