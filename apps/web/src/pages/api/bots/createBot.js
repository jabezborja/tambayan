import { addDocument } from "../../../firebase/database";
import User from "../../../models/user";
import { uuidv4 } from "@firebase/util";

export default (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") return res.status(405);

        const botUid = new Date().getTime().toString();
        const bot = new User(`bot-${botUid}`, req.body.displayName, req.body.email, req.body.photoURL, true);
        const botJson = bot.toJson();

        botJson['accessKey'] = uuidv4();
        botJson['interactionEndpointURL'] = req.body.interactionEndpointURL;
        botJson['botCommand'] = req.body.botCommand;
        botJson['creatorId'] = req.body.creatorId;

        addDocument("bots", botJson)
            .then((id) => {
                res.status(200).send({ success: true });
                resolve()
            });
    });
}