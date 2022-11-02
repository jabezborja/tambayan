
export default async function handler(req, res) {

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
        messageToBeSent = "<img src='https://media.tenor.com/ypAFp65sE-sAAAAd/roblox-dancing.gif'></img>"
    } else {
        messageToBeSent = "Beep boop! That doesn't exist in my vocabulary."
    }
    
    fetch(req.body.callback, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            botId: "m7O7fDTVyM6j4AtLpVQH",
            accessKey: req.body.accessKey,
            roomId: req.body.roomId,
            message: `<p>${messageToBeSent}</p>`
        })
    })
}