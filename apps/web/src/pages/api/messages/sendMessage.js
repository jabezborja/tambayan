import { getDocument, updateMessages } from "../../../firebase/database";
import Message from "../../../models/message";
import { inProduction } from '../../../utils/environment';
import { checkIsBotCommand } from "../../../utils/botUtils";
import { uuidv4 } from '@firebase/util';

export default (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") return res.status(405);

        req.body.user['moderator'] = req.body.moderator;

        getDocument("rooms", req.body.roomId)
            .then((data) => {

                const message = new Message(
                    uuidv4(), // Message ID
                    req.body.user,
                    req.body.message,
                    req.body.repliedTo,
                    new Date()
                );

                const [ isBotCommand, botCommand ] = checkIsBotCommand(data.installedBots, message.message);

                if (isBotCommand) {
                    // If the message is a Bot Command, modify the message to `/botcommand` for markdown.
                    message.message = message.message.replace(`/${botCommand}`, `\`/${botCommand}\``);
                }
        
                updateMessages("rooms", req.body.roomId, message.id, message.toJson())
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

const fireBotsCallback = async (room, roomId, message) => {

    for (let i = 0; i < room.installedBots.length; i++) {

        const bot = room.installedBots[i];
        const botSlashCommand = '/' + bot.botCommand;

        if (message.message.includes(botSlashCommand)) {

            await fetch(bot.callbackUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId: roomId,
                    accessKey: bot.accessKey,
                    message: message,
                    callback: `${inProduction ? 'https://tambayan.link' : 'http://localhost:3000'}/api/bots/botMessage`
                })
            });
        }
    }

}