import { getDocument, updateMessages } from "../../../firebase/database";
import Message from "../../../models/message";
import { inProduction } from "../../../utils/environment";

const fireBotsCallback = (room, roomId, message) => {
    room.installedBots.forEach(async (bot) => {

        console.log("Bot", bot)

        if (message.message.includes('/' + bot.botCommand)) {

            console.log("Detected includes")

            await fetch(bot.callbackUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId: roomId,
                    accessKey: bot.accessKey,
                    message: message,
                    callback: 'https://tambayan.link/api/bots/botMessage'
                })
            });

            console.log("Done")

            return;
        }
    });
}

export default function handler(req, res) {

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

                        console.log("Success appended")

                        fireBotsCallback(data, req.body.roomId, message.toJson())

                        res.status(200).send({ success: true });
                    } else {
                        res.status(500).send({ success: false, error: err }); 
                    }
                })

        });
}