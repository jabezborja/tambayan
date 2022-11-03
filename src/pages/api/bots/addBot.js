import { getDocument, updateBots } from "../../../firebase/database";

export default function handler(req, res) {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") return res.status(405);

        getDocument("bots", req.body.botId)
            .then((data) => {        
                if (data.accessKey !== req.body.accessKey) {
                    return res.status(401).send({ error: "Wrong accessKey. Access denied.", success: false })
                }

                updateBots("rooms", req.body.roomId, data)
                    .then(([ success, err ]) => {
                        if (success) {
                            res.status(200).send({ success: true });
                            resolve();
                        } else {
                            res.status(500).send({ success: false, error: err });
                            resolve();
                        }
                    });
            });
    })
}