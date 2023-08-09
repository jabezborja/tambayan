import { getDocument } from "../firebase/database";
import Bot from "../models/bot";

const checkIsBotCommand = async (bots, message) => {
    
    for (let i = 0; i < bots.length; i++) {

        const botData = await getDocument("bots", bots[i]);
        const bot = new Bot(
            botData['uid'],
            botData['displayName'],
            botData['email'],
            botData['photoURL'],
            botData['botCommand'],
            botData['creatorId'],
            botData['accessKey'],
            botData['interactionEndpointURL'],
            botData['isBot']
        )
        const botSlashCommand = '/' + bot.botCommand;

        if (message.includes(botSlashCommand)) {
            return bot.botCommand;
        }

        return false;

    }
    
}

export { checkIsBotCommand }