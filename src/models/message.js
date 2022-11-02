
class Message {
    constructor(id, user, message, repliedTo, dateSent) {
        this.id = id;
        this.user = user;
        this.message = message;
        this.repliedTo = repliedTo;
        this.dateSent = dateSent;
    }

    toJson() {
        return {
            messageId: this.id,
            user: this.user,
            message: this.message,
            repliedTo: this.repliedTo,
            dateSent: this.dateSent
        };
    }
}

export default Message;