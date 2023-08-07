import Message from "../models/message";

const BotMessage = ({ botId, reply, roomId }) => {
    getDocument("bots", botId)
        .then((bot) => {

            const message = new Message(
                uuidv4(), // ID
                bot,
                reply,
                null,
                moment().toDate()
            );

            updateMessages("rooms", roomId, message.id, message.toJson())
                .then(([ success, err ]) => {
                    if (success) {
                        return true;
                    } else {
                        return false;
                    }
                })
        });
}

export default BotMessage;