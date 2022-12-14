import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.post('/api/rodulfo', (req, res) => {
    return new Promise(async (resolve, reject) => {
        if (req.method !== "POST") return res.status(405);

        var messageToBeSent;

        const message = req.body.message.message;

        if (message.includes("help")) {
            messageToBeSent = "<p>Rodulfo commands: <b>/rodulfo [command]</b></p><br /><p><b>Commands:</b></p><p><pre><code>bark</code></pre> - bark like a good dog</p><p><pre><code>value of pi</code></pre> - show the value of pi</p><p><pre><code>dance</code></pre> - rodulfo will dance</p>"
        } else if (message.includes("bark")) {
            messageToBeSent = "Woof! Woof!"
        } else if (message.includes("value of pi")) {
            messageToBeSent = Math.PI.toString()
        } else if (message.includes("dance")) {
            messageToBeSent = "<p><img width='500' src='https://i.pinimg.com/originals/06/51/02/0651024a0251d8eca94fa29d6c185822.gif'></img></p>"
        } else {
            messageToBeSent = "Beep boop! That doesn't exist in my vocabulary."
        }
        
        const result = await fetch(req.body.callback, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                botId: "kec1nXCEtzeXverw3fZD",
                accessKey: req.body.accessKey,
                roomId: req.body.roomId,
                message: `<p>${messageToBeSent}</p>`
            })
        });

        const data = await result.json();

        res.status(200).send(data);
        resolve();
    });
})

app.listen(PORT, () => console.log("Listening to " + PORT))