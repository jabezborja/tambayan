import { addDocument } from "../../../firebase/database";
import Room from "../../../models/room";
import Message from "../../../models/message";

export default function handler(req, res) {

    if (req.method !== "POST") return res.status(405);

    const roomIntroduction = new Message(
        { displayName: "Jabchat", email: "jabez.natsu@gmail.com", photoURL: "https://images.emojiterra.com/google/android-10/512px/1f916.png", uid: "jabchat-admin", verified: true },
        "Welcome to " + req.body.roomName + ". Say Hello!",
        new Date()
    );

    const room = new Room(
        req.body.roomName,
        req.body.roomOwnerId,
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