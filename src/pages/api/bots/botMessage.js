import { getDocument, updateMessages } from "../../../firebase/database";
import Message from "../../../models/message";

export default function handler(req, res) {
    
    if (req.method !== "POST") return res.status(405);

    const botDoc = getDocument("bots", req.body.botId);

    console.log("Callback fired");

    botDoc.then((bot) => {
        if (bot.accessKey !== req.body.accessKey) {
            return res.status(401).send({ error: "Wrong accessKey. Access denied.", success: false })
        }

        console.log("Valid access keys")

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
                    console.log("Success")
                    res.status(200).send({ success: true });
                } else {
                    res.status(500).send({ success: false, error: err }); 
                }
            })
    })
}