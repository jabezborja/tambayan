
class Bot {
    constructor(uid, displayName, email, photoURL, botCommand, creatorId, accessKey, interactionEndpointURL, isBot) {
        this.uid = uid;
        this.displayName = displayName;
        this.email = email;
        this.photoURL = photoURL;
        this.botCommand = botCommand;
        this.creatorId = creatorId;
        this.accessKey = accessKey;
        this.interactionEndpointURL = interactionEndpointURL;
        this.isBot = isBot;
    }

    toJson() {
        return {
            uid: this.uid,
            displayName: this.displayName,
            email: this.email,
            photoURL: this.photoURL,
            botCommand: this.botCommand,
            creatorId: this.creatorId,
            accessKey: this.accessKey,
            isBot: this.isBot,
            verified: false
        };
    }
}

export default Bot;