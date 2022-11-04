import { getDocument, updateMessages } from "../../../firebase/database";

export default (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") return res.status(405);

        getDocument("rooms", req.body.roomId)
            .then((data) => {

                var message = null;

                data.messages.forEach((m) => {
                    if (req.body.messageId === m.messageId) {
                        message = m;
                    }
                });
        
                updateMessages("rooms", req.body.roomId, message, false)
                    .then(([ success, err ]) => {
                        if (success) {
                            res.status(200).send({ success: true });
                            resolve()
                        } else {
                            res.status(500).send({ success: false, error: err });
                            resolve();
                        }
                    })

            });
    })
}