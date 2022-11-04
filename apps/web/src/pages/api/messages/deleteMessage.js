import { deleteMessage, getMessagesByRoom } from "../../../firebase/database";

export default (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") return res.status(405);

        getMessagesByRoom(req.body.roomId)
            .then((message) => {

                var messageToDelete = null;

                message.forEach((m) => {
                    if (req.body.messageId === m.data().messageId) {
                        messageToDelete = m.data();
                    }
                })

                deleteMessage(req.body.roomId, messageToDelete.messageId);

            });

    })
}