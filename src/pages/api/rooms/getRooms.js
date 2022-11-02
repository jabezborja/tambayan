import { getDocuments } from "../../../firebase/database";

export default function handler(req, res) {

    if (req.method !== "GET") return res.status(405);

    const rooms = [];
    
    const roomsDoc = getDocuments("rooms");

    roomsDoc.then((snap) => {
        snap.forEach((room) => {

            const data = room.data();
    
            rooms.push({
                id: room.id,
                roomName: data.roomName,
                description: data.description,
                roomOwner: data.roomOwner,
                isPublic: data.isPublic,
                password: data.password,
                dateCreated: data.dateCreated
            });
        });

        res.status(200).send({ rooms: rooms });
    });

}