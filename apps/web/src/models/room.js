
class Room {
    constructor(roomName, description, roomOwner, password, isPublic, installedBots, dateCreated) {
        this.roomName = roomName;
        this.description = description;
        this.roomOwner = roomOwner;
        this.password = password;
        this.isPublic = isPublic;
        this.installedBots = installedBots;
        this.dateCreated = dateCreated;
    }

    toJson() {
        return {
            id: null,
            roomName: this.roomName,
            description: this.description,
            roomOwner: this.roomOwner,
            password: this.password,
            isPublic: this.isPublic,
            installedBots: this.installedBots,
            roomOffer: null,
            archived: false,
            dateCreated: this.dateCreated
        };
    }
}

export default Room;