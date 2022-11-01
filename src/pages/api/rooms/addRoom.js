import { addDocument } from "../../../firebase/database";
import Room from "../../../models/room";
import Message from "../../../models/message";

export default function handler(req, res) {

    if (req.method !== "POST") return res.status(405);

    const roomIntroduction = new Message(
        "Jabchat",
        "jabchat-admin",
        "Welcome to " + req.body.roomName + ". Say Hello!",
        Date()
    );

    const room = new Room(
        req.body.roomName,
        req.body.roomOwner,
        [roomIntroduction.toJson()],
        req.body.password,
        req.body.isPublic,
        req.body.dateCreated
    );
    
    const roomDoc = addDocument("rooms", room.toJson());

    roomDoc.then((id) => {
        res.status(200).send({ roomId: id, success: true });
    });

}