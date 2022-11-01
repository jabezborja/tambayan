
class Room {
    constructor(roomName, roomOwner, messages, password, isPublic, dateCreated) {
        this.roomName = roomName;
        this.roomOwner = roomOwner;
        this.messages = messages;
        this.password = password;
        this.isPublic = isPublic;
        this.dateCreated = dateCreated;
    }

    toJson() {
        return {
            roomName: this.roomName,
            roomOwner: this.roomOwner,
            messages: this.messages,
            password: this.password,
            isPublic: this.isPublic,
            archived: false,
            dateCreated: this.dateCreated
        };
    }
}

export default Room;