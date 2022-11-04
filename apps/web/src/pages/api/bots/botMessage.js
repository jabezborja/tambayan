import { getDocument, updateMessages } from "../../../firebase/database";
import Message from "../../../models/message";
import { uuidv4 } from '@firebase/util';

export default (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") return res.status(405);

        getDocument("bots", req.body.botId)
            .then((bot) => {
                if (bot.accessKey !== req.body.accessKey) {
                    res.status(401).send({ error: "Wrong accessKey. Access denied.", success: false });
                    resolve();
                }

                const message = new Message(
                    uuidv4(), // ID
                    bot,
                    req.body.message,
                    null,
                    Date()
                );

                updateMessages("rooms", req.body.roomId, message.id, message.toJson())
                    .then(([ success, err ]) => {
                        if (success) {
                            res.status(200).send({ success: true });
                            resolve();
                        } else {
                            res.status(500).send({ success: false, error: err });
                            resolve();
                        }
                    })
            });
    });
}