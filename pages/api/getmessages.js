export default function handler(req, res) {
    res.status(200).json(
        { datas: [
            { userId: "123", messageId: "01", message: "Hello there, mate." },
            { userId: "124", messageId: "02", message: "Heyy, what's up! How you doin'?" },
            { userId: "123", messageId: "03", message: "I'm doing good, thanks!" }
        ]})
}