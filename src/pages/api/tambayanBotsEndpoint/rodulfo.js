import { inProduction } from "../../../utils/environment";

export default async function handler(req, res) {

    if (req.method !== "POST") return res.status(405);

    var messageToBeSent;
    const message = req.body.message.message;

    console.log("TEST")

    if (message.includes("/rodulfo")) {
        if (message.includes("bark")) {
            messageToBeSent = "Woof! Woof!"
        } else if (message.includes("meme")) {

            await fetch('https://api.imgflip.com/get_memes')
                .then((res) => res.json())
                .then((data) => {
                    messageToBeSent = `<img src='${data.data.memes[Math.floor(Math.random() * data.data.memes.length-1)].url}'></img>`
                })
            
        }
    }
    
    fetch(`${inProduction ? 'https://tambayan.netlify.app' : 'http://localhost:3000'}/api/bots/botMessage`, {
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