
class Room {
    constructor(roomName, description, roomOwnerId, password, isPublic, installedBots, botCommands, dateCreated) {
        this.roomName = roomName;
        this.description = description;
        this.roomOwnerId = roomOwnerId;
        this.password = password;
        this.isPublic = isPublic;
        this.installedBots = installedBots;
        this.botCommands = botCommands;
        this.dateCreated = dateCreated;
    }

    toJson() {
        return {
            id: null,
            roomName: this.roomName,
            description: this.description,
            roomOwner: this.roomOwnerId,
            password: this.password,
            isPublic: this.isPublic,
            installedBots: this.installedBots,
            botCommands: this.botCommands,
            archived: false,
            dateCreated: this.dateCreated
        };
    }
}

export default Room;