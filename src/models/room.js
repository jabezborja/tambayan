
class Room {
    constructor(roomName, roomOwnerId, messages, password, isPublic, dateCreated) {
        this.roomName = roomName;
        this.roomOwnerId = roomOwnerId;
        this.messages = messages;
        this.password = password;
        this.isPublic = isPublic;
        this.dateCreated = dateCreated;
    }

    toJson() {
        return {
            roomName: this.roomName,
            roomOwner: this.roomOwnerId,
            messages: this.messages,
            password: this.password,
            isPublic: this.isPublic,
            archived: false,
            dateCreated: this.dateCreated
        };
    }
}

export default Room;