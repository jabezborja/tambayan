import { getDocuments } from "../../../firebase/database";

export default function handler(req, res) {

    if (req.method !== "GET") return res.status(405);

    const rooms = [];
    
    const roomsDoc = getDocuments("rooms");

    roomsDoc.then((snap) => {
        snap.forEach((room) => {

            var data = room.data();
            data['id'] = room.id
    
            rooms.push(data);
        });

        res.status(200).send({ rooms: rooms });
    });

}