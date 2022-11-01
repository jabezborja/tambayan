
class Message {
    constructor(user, message, dateSent) {
        this.user = user;
        this.message = message;
        this.dateSent = dateSent;
    }

    toJson() {
        return {
            user: this.user,
            message: this.message,
            dateSent: this.dateSent
        };
    }
}

export default Message;