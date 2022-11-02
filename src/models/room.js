
class Room {
    constructor(roomName, description, roomOwnerId, messages, password, isPublic, bots, dateCreated) {
        this.roomName = roomName;
        this.description = description;
        this.roomOwnerId = roomOwnerId;
        this.messages = messages;
        this.password = password;
        this.isPublic = isPublic;
        this.bots = bots;
        this.dateCreated = dateCreated;
    }

    toJson() {
        return {
            roomName: this.roomName,
            description: this.description,
            roomOwner: this.roomOwnerId,
            messages: this.messages,
            password: this.password,
            isPublic: this.isPublic,
            bots: this.bots,
            archived: false,
            dateCreated: this.dateCreated
        };
    }
}

export default Room;