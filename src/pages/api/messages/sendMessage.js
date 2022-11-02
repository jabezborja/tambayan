import { getDocument, updateMessages } from "../../../firebase/database";
import Message from "../../../models/message";
import { inProduction } from "../../../utils/environment";

const fireBotsCallback = (room, roomId, message) => {
    room.bots.forEach(async (bot) => {
        if (message.message.includes('/' + bot.botCommand)) {
            await fetch(bot.callbackUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId: roomId,
                    accessKey: bot.accessKey,
                    message: message,
                    callback: `${inProduction ? 'https://tambayan.netlify.app' : 'http://localhost:3000'}/api/bots/botMessage`
                })
            });

            return;
        }
    });
}

export default function handler(req, res) {

    if (req.method !== "POST") return res.status(405);

    req.body.user['moderator'] = req.body.moderator;

    getDocument("rooms", req.body.roomId)
        .then((data) => {

            const message = new Message(req.body.user, req.body.message, new Date());
    
            updateMessages("rooms", req.body.roomId, message.toJson())
                .then(([ success, err ]) => {
                    if (success) {

                        fireBotsCallback(data, req.body.roomId, message.toJson())

                        res.status(200).send({ success: true });
                    } else {
                        res.status(500).send({ success: false, error: err }); 
                    }
                })

        });
}