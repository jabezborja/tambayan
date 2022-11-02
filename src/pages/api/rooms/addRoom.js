import { addDocument, updateMessages } from "../../../firebase/database";
import Room from "../../../models/room";
import Message from "../../../models/message";

export default function handler(req, res) {

    if (req.method !== "POST") return res.status(405);

    const room = new Room(
        req.body.roomName,
        req.body.description,
        req.body.roomOwner,
        [],
        req.body.password,
        req.body.isPublic,
        [],
        req.body.dateCreated
    );
    
    const roomDoc = addDocument("rooms", room.toJson());

    roomDoc.then((id) => {
        const rodulfoBotId = "m7O7fDTVyM6j4AtLpVQH";
        const rodulfoBotAccessKey = "cdcac631-f569-4082-b062-977e25f71278";

        // Install Rodulfo Bot to the Tambayan room
        fetch('http://localhost:3000/api/bots/addBot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                botId: rodulfoBotId,
                accessKey: rodulfoBotAccessKey,
                callback: 'http://localhost:3000/api/tambayanBotsEndpoint/rodulfo',
                roomId: id
            })
        })

        // Initial Rodulfo message.
        fetch('http://localhost:3000/api/bots/botMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                botId: rodulfoBotId,
                accessKey: rodulfoBotAccessKey,
                roomId: id,
                message: "Hey, what's up mga lodi. Welcome to " + req.body.roomName + ". Say Hello! Beep boop!<br /><br />Invite your friends here to our tambayan:<br /><strong>https://tambayan.netlify.app/chat?room=" + id + "</strong>"
            })
        })

        res.status(200).send({ roomId: id, success: true });
    });

}