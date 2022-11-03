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
                    message: "[]",
                    callback: `${inProduction ? 'https://tambayan.link' : 'http://localhost:3000'}/api/bots/botMessage`
                })
            });

            return;
        }
    });
}

export default function handler(req, res) {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") return res.status(405);

        getDocument("rooms", req.body.roomId)
            .then((data) => {

                var message = null;

                data.messages.forEach((m) => {
                    if (req.body.messageId === m.messageId) {
                        message = m;
                    }
                });
        
                updateMessages("rooms", req.body.roomId, message, false)
                    .then(([ success, err ]) => {
                        if (success) {
                            res.status(200).send({ success: true });
                            resolve()
                        } else {
                            res.status(500).send({ success: false, error: err });
                            resolve();
                        }
                    })

            });
    })
}