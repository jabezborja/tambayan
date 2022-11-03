import { getDocument } from "../../../firebase/database";

export default function handler(req, res) {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") return res.status(405);
    
        getDocument("rooms", req.body.roomId)
            .then((room) => {
                res.status(200).send(room);
                resolve();
            });
    })
}