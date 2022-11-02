import { addDocument } from "../../../firebase/database";
import User from "../../../models/user";
import { uuidv4 } from "@firebase/util";

export default function handler(req, res) {

    if (req.method !== "POST") return res.status(405);

    const botUid = new Date().getTime().toString();
    const bot = new User(`bot-${botUid}`, req.body.displayName, req.body.email, req.body.photoURL, true);
    const botJson = bot.toJson();

    botJson['accessKey'] = uuidv4();

    const botDoc = addDocument("bots", botJson);

    botDoc.then((id) => {
        res.status(200).send({ botId: id, accessKey: botJson.accessKey, success: true });
    });

}