import { getDocument } from "../../../firebase/database";

export default function handler(req, res) {

    if (req.method !== "POST") return res.status(405);
    
    const roomDoc = getDocument("rooms", req.body.roomId);

    roomDoc.then((room) => {
        res.status(200).send(room);
    })
}