import { addDocument, getDocument } from "../../../firebase/database";
import { inProduction } from "../../../utils/environment";
import Room from "../../../models/room";
import Bot from "../../../models/bot"
import sendBotMessage from "../../../api-helpers/botMessage";

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
                const rodulfoBotId = "kec1nXCEtzeXverw3fZD";
                const rodulfoBotAccessKey =  "6d8f5fdf-a7b2-4669-aee5-c65cfa4d4523";

                // Install Rodulfo Bot to the Tambayan room
                await fetch(`${inProduction ? 'https://tambayan.link' : 'http://localhost:3000'}/api/bots/addBot`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        botId: rodulfoBotId,
                        accessKey: rodulfoBotAccessKey,
                        roomId: id
                    })
                });

                const botData = await getDocument("bots", rodulfoBotId);
                const bot = new Bot(
                    botData['uid'],
                    botData['displayName'],
                    botData['email'],
                    botData['photoURL'],
                    botData['botCommand'],
                    botData['creatorId'],
                    botData['accessKey'],
                    botData['interactionEndpointURL'],
                    botData['isBot']
                );

                sendBotMessage({
                    bot: bot,
                    reply: "Hey, what's up mga lodi. Welcome to " + req.body.roomName + ". Say Hello! Beep boop!<br /><br />Type `/rodulfo help` to know my commands.<br /><br />Invite your friends here to our tambayan:<br /><strong>https://tambayan.link/t/" + id + "</strong>",
                    roomId: id
                })

                res.status(200).send({ roomId: id, success: true });
                resolve();
            });
    })
}