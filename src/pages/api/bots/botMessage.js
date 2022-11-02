import { getDocument, updateMessages } from "../../../firebase/database";
import Message from "../../../models/message";

export default function handler(req, res) {
    
    if (req.method !== "POST") return res.status(405);

    const bot = getDocument("bots", req.body.botId);

    bot.then((data) => {
        if (data.accessKey !== req.body.accessKey) {
            return res.status(401).send({ error: "Wrong accessKey. Access denied.", success: false })
        }

        const message = new Message(data, req.body.message, Date());

        updateMessages("rooms", req.body.roomId, message.toJson())
            .then(([ success, err ]) => {
                if (success) {
                    res.status(200).send({ success: true });
                } else {
                    res.status(500).send({ success: false, error: err }); 
                }
            })
    })
}