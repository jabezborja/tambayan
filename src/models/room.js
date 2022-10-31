
class Room {
    constructor(roomName, dateCreated) {
        this.roomName = roomName;
        this.dateCreated = dateCreated;
    }

    toJson() {
        return {
            roomName: this.roomName,
            messages: [],
            dateCreated: this.dateCreated
        };
    }
}

export default Room;