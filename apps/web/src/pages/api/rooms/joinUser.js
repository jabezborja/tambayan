import { updateJoinedUsers } from "../../../firebase/database";

export default (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") return res.status(405);
        
        updateJoinedUsers("rooms", req.body.roomId, req.body.user)
            .then((data) => {
                const [ result, error ] = data;

                if (result) {
                    res.status(200).send({ result: 'success' });
                    resolve();
                }
            })
    })
}