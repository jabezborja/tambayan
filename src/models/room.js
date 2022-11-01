
class Room {
    constructor(roomName, messages, dateCreated) {
        this.roomName = roomName;
        this.messages = messages;
        this.dateCreated = dateCreated;
    }

    toJson() {
        return {
            roomName: this.roomName,
            messages: this.messages,
            dateCreated: this.dateCreated
        };
    }
}

export default Room;