import { addDocument } from "../../../firebase/database";
import Room from "../../../models/room";
import { inProduction } from "../../../utils/environment";

export default (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") return res.status(405);

        const room = new Room(
            req.body.roomName,
            req.body.description,
            req.body.roomOwner,
            req.body.password,
            req.body.isPublic,
            [], // Installed Bots
            req.body.dateCreated
        );
        
        addDocument("rooms", room.toJson())
            .then(async (id) => {
                const rodulfoBotId = inProduction ? "kec1nXCEtzeXverw3fZD" : 'm7O7fDTVyM6j4AtLpVQH';
                const rodulfoBotAccessKey = inProduction ? "6d8f5fdf-a7b2-4669-aee5-c65cfa4d4523" : 'cdcac631-f569-4082-b062-977e25f71278';

                // Install Rodulfo Bot to the Tambayan room
                await fetch(`${inProduction ? 'https://tambayan.link' : 'http://localhost:3000'}/api/bots/addBot`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        botId: rodulfoBotId,
                        accessKey: rodulfoBotAccessKey,
                        roomId: id
                    })
                })

                // Initial Rodulfo message.
                await fetch(`${inProduction ? 'https://tambayan.link' : 'http://localhost:3000'}/api/bots/botMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        botId: rodulfoBotId,
                        accessKey: rodulfoBotAccessKey,
                        roomId: id,
                        message: "Hey, what's up mga lodi. Welcome to " + req.body.roomName + ". Say Hello! Beep boop!<br /><br />Type `/rodulfo help` to know my commands.<br /><br />Invite your friends here to our tambayan:<br /><strong>https://tambayan.link/t/" + id + "</strong>"
                    })
                })

                res.status(200).send({ roomId: id, success: true });
                resolve();
            });
    })
}