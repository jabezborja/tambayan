import { updateMessages } from "../firebase/database";
import Message from "../models/message";
import { uuidv4 } from '@firebase/util';
import moment from 'moment';


const sendBotMessage = ({ bot, reply, roomId }) => {

    const message = new Message(
        uuidv4(), // ID
        bot.toJson(),
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
}

export default sendBotMessage;