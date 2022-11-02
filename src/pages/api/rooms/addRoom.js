import { addDocument, updateMessages } from "../../../firebase/database";
import Room from "../../../models/room";
import Message from "../../../models/message";

export default function handler(req, res) {

    if (req.method !== "POST") return res.status(405);

    const room = new Room(
        req.body.roomName,
        req.body.description,
        req.body.roomOwner,
        [],
        req.body.password,
        req.body.isPublic,
        req.body.dateCreated
    );
    
    const roomDoc = addDocument("rooms", room.toJson());

    roomDoc.then((id) => {
        const roomIntroduction = new Message(
            {
                displayName: "Lodi Rodulfo, ang Robot", 
                email: "jabez.natsu@gmail.com",
                photoURL: "https://images.emojiterra.com/google/android-10/512px/1f916.png",
                uid: "rodulfo-the-admin",
                verified: true,
                moderator: true
            },
            "Hey, what's up mga lodii. Welcome to " + req.body.roomName + ". Say Hello! Beep boop!<br /><br />Invite your friends here to our tambayan:<br /><strong>https://tambayan.netlify.app/chat?room=" + id + "</strong>",
            new Date()
        );

        updateMessages("rooms", id, roomIntroduction.toJson());

        res.status(200).send({ roomId: id, success: true });
    });

}