import { getDocuments } from "../../../firebase/database";

export default (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "GET") return res.status(405);

        const rooms = [];
        
        getDocuments("rooms")
            .then((snap) => {
                snap.forEach((room) => {

                    var data = room.data();
                    data['id'] = room.id
            
                    rooms.push(data);
                });

                res.status(200).send({ rooms: rooms });
                resolve();
            });
    })
}