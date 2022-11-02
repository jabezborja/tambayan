
class Message {
    constructor(id, user, message, dateSent) {
        this.id = id;
        this.user = user;
        this.message = message;
        this.dateSent = dateSent;
    }

    toJson() {
        return {
            messageId: this.id,
            user: this.user,
            message: this.message,
            dateSent: this.dateSent
        };
    }
}

export default Message;