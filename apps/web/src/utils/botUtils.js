const checkIsBotCommand = (bots, message) => {
    
    for (let i = 0; i < bots.length; i++) {

        const bot = bots[i];
        const botSlashCommand = '/' + bot.botCommand;

        if (message.includes(botSlashCommand)) {
            return [true, bot.botCommand];
        }

        return [false, null];

    }
    
}

export { checkIsBotCommand }