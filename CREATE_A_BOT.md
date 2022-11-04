# Tambayan Bots API
Want to create your own Bot and add it to the Tambayan? Using Tambayan Bot API, you can create your own bot and moderate your tambayan, create more fun, and more.

## First, create a Bot account.
As of now, bot creation is not available by UI. You must ask me on Discord (jabez#1714) first before creating one.

Bot creation will provide you your Bot's `botId` and `accessKey` to access the Tambayan Bot API.

## Second, add your Bot to a Tambayan room
As of now, bot creation is not available by UI. You must ask me on Discord (jabez#1714) first before creating one.

You need to provide the `botId` and the `accessKey` of your Bot and the Tambayan `roomId` where the Bot will be installed.

### A simple bot
Here is a super simple example of how to use Tambayan Bot API using Express and Node.js.
```js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.post('/api', (req, res) => {

    if (req.method !== "POST") return res.status(405);

    var messageToBeSent;

    const message = req.body.message.message;

    if (message.includes("bark")) {
        messageToBeSent = "Woof! Woof!"
    } else {
        messageToBeSent = "Beep boop! That doesn't exist in my vocabulary."
    }
    
    // `callback` is provided by the Tambayan API.
    const result = await fetch(req.body.callback, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            botId: "kec1nXCEtzeXverw3fZD", // Your BOT ID
            accessKey: req.body.accessKey, // Your BOT ACCESS KEY
            roomId: req.body.roomId, // Room ID of where the message has been sent from.
            message: `<p>${messageToBeSent}</p>`
        })
    });

    const data = await result.json();

    res.status(200).send(data);
})

app.listen(PORT, () => console.log("Listening to " + PORT));
```
_A simple note: To test your Tambayan Bot on your local environment, you must use `CURL` or `PostMan` to do this and send the following as `json` body:_
```json
{
    "message": "YOUR MESSAGE TEST HERE",
    "callback": "https://tambayan.link/api/bots/botMessage",
    "accessKey": "YOUR_BOT_ACCESS_KEY",
    "roomId": "TAMBAYAN_ROOM_ID"
}
```