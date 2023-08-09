import { updateBots } from "../../../firebase/database";

export default (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") return res.status(405);

        updateBots("rooms", req.body.roomId, req.body.botId)
            .then(([ success, err ]) => {
                if (success) {
                    res.status(200).send({ success: true });
                    resolve();
                } else {
                    res.status(500).send({ success: false, error: err });
                    resolve();
                }
            });
    })
}