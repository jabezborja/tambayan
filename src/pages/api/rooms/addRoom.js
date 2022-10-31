import { addDocument } from "../../../firebase/database";
import Room from "../../../models/room";

export default function handler(req, res) {

    if (req.method !== "POST") return res.status(405);

    const room = new Room(req.body.roomName, req.body.dateCreated);
    
    addDocument("rooms", room.toJson());

    res.status(200).send({ success: true });

}