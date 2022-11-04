import { getDocument, updateMessages } from "../../../firebase/database";
import Message from "../../../models/message";

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
                    Date().toString(), // ID
                    bot,
                    req.body.message,
                    null,
                    Date()
                );

                updateMessages("rooms", req.body.roomId, message.toJson())
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