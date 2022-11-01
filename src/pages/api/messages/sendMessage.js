import { updateDocument } from "../../../firebase/database";
import Message from "../../../models/message";

export default function handler(req, res) {

    if (req.method !== "POST") return res.status(405);

    const message = new Message(req.body.userName, req.body.userId, req.body.message, new Date());
    
    updateDocument("rooms", req.body.roomId, message.toJson())
        .then(([ success, err ]) => {
            if (success) {
                res.status(200).send({ success: true });
            } else {
                res.status(500).send({ success: false, error: err }); 
            }
        })

}