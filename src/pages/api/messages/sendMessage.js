import { getDocument, updateMessages } from "../../../firebase/database";
import Message from "../../../models/message";

const fireBotsCallback = async (room, roomId, message) => {

    for (let i = 0; i < room.installedBots.length; i++) {

        const bot = room.installedBots[i];

        if (message.message.includes('/' + bot.botCommand)) {

            await fetch(bot.callbackUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId: roomId,
                    accessKey: bot.accessKey,
                    message: message,
                    callback: `https://tambayan.netlify.app/api/bots/botMessage`
                })
            });
        }
    }

}

export default function handler(req, res) {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") return res.status(405);

        req.body.user['moderator'] = req.body.moderator;

        getDocument("rooms", req.body.roomId)
            .then((data) => {

                const message = new Message(
                    Date().toString(), // Message ID
                    req.body.user,
                    req.body.message,
                    req.body.repliedTo,
                    new Date()
                );
        
                updateMessages("rooms", req.body.roomId, message.toJson())
                    .then(([ success, err ]) => {
                        if (success) {
                            fireBotsCallback(data, req.body.roomId, message.toJson())
                                .then(() => {
                                    res.status(200).send({ success: true });
                                    resolve();
                                });
                        } else {
                            res.status(500).send({ success: false, error: err }); 
                            resolve()
                        }
                    })

            });
    })
}