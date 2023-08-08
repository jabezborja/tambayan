
export default (req, res) => {
    return new Promise(async (resolve, reject) => {

        if (req.method !== "POST") return res.status(405);

        const command = req.body.command;

        var reply;

        switch (command.toLowerCase()) {
            case 'help':
                reply = "<p>Rodulfo commands:<b>/rodulfo [command]</b></p><br /><p><b>Commands:</b></p><p><pre><code>bark</code></pre> - bark like a good dog</p><p><pre><code>value of pi</code></pre> - show the value of pi</p><p><pre><code>dance</code></pre> - rodulfo will dance</p>";
            case 'bark':
                reply = "Woof! Woof!";
            case 'value of pi':
                reply = Math.PI.toString();
            case 'dance':
                reply = "<p><img width='500' src='https://i.pinimg.com/originals/06/51/02/0651024a0251d8eca94fa29d6c185822.gif'></img></p>";
            case 'version':
                reply = "Halo! My current version is v0.2.0";
            default:
                reply = "Beep boop! That doesn't exist in my vocabulary.";

            res.status(200).send({
                data: {
                    content: reply
                }
            });
        }
        resolve();
    });
}