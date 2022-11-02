
class User {
    constructor(uid, displayName, email, photoURL, isBot) {
        this.uid = uid;
        this.displayName = displayName;
        this.email = email;
        this.photoURL = photoURL;
        this.isBot = isBot;
    }

    toJson() {
        return {
            uid: this.uid,
            displayName: this.displayName,
            email: this.email,
            photoURL: this.photoURL,
            isBot: this.isBot,
            verified: false
        };
    }
}

export default User;