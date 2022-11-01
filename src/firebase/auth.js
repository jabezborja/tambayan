import { getAuth, onAuthStateChanged, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { setUser } from '../slices/userSlice';
import store from '../store';
import app from './clientApp';

const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();

const signInWithGithub = async () => {
    await signInWithPopup(auth, githubProvider)
        .then((result) => {

            // This line of code can be used to access more the GitHub API
            // const credential = GithubAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;

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
    if (u) {
        store.dispatch(setUser(u));
    } else {
        store.dispatch(setUser(null));
    }
});

export { signOutAccount, signInWithGithub, auth };