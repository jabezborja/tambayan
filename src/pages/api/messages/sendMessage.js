import { getDocument, updateMessages } from "../../../firebase/database";
import Message from "../../../models/message";

const fireBotsCallback = async (room, roomId, message) => {

    let botsFired = [];

    for (let i = 0; i < room.installedBots.length; i++) {

        const bot = room.installedBots[i];

        if (message.message.includes('/' + bot.botCommand)) {            
            botsFired.push(
                await fetch(bot.callbackUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        roomId: roomId,
                        accessKey: bot.accessKey,
                        message: message,
                        messengerUrl: 'https://tambayan.link/api/bots/botMessage'
                    })
                })
            )
        }
    }

    return Promise.all(botsFired)
        .then((data) => {
            botsFired = [];
        })
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
                                .then(() => console.log("Bots fired."))

                            res.status(200).send({ success: true });
                            resolve()
                        } else {
                            res.status(500).send({ success: false, error: err }); 
                            resolve()
                        }
                    })

            });
    })
}