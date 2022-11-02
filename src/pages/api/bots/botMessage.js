import { getDocument, updateBots } from "../../../firebase/database";
import Message from "../../../models/message";

export default function handler(req, res) {
    // Room, Bot (User obj), Message

    if (req.method !== "POST") return res.status(405);

    const bot = getDocument("bots", req.body.botId);

    bot.then((data) => {
        if (data.accessKey !== req.body.accessKey) {
            return res.status(401).send({ error: "Wrong accessKey. Access denied.", success: false })
        }
    
        updateBots("rooms", req.body.roomId, bot)
            .then(([ success, err ]) => {
                if (success) {
                    res.status(200).send({ success: true });
                } else {
                    res.status(500).send({ success: false, error: err }); 
                }
            })
    })
}