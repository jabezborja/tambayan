
class Message {
    constructor(userName, senderUid, message, dateSent) {
        this.userName = userName;
        this.senderUid = senderUid;
        this.message = message;
        this.dateSent = dateSent;
    }

    toJson() {
        return {
            userName: this.userName,
            senderUid: this.senderUid,
            message: this.message,
            dateSent: this.dateSent
        };
    }
}

export default Message;