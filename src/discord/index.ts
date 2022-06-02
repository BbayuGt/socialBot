
import config from '../config/config';
import { Client, Message, MessageEmbed, TextChannel } from 'discord.js';
import { getClient } from '../whatsapp';
import { ContactId } from '@open-wa/wa-automate';


// Create a new Discord client
const client = new Client({
    intents:["GUILDS", "GUILD_MESSAGES"]
});
export const DCClient = client;

if (!client) throw new Error("Client not created");

let WAClient = getClient()

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) return;
    if (message.channel.id !== config.discord.channel) return
    if (!WAClient) {
        WAClient = getClient()
        message.channel.send("Waiting for WhatsApp client... Please resend your message")
        if (!WAClient) return
    } // Client is not ready

    WAClient.sendText(config.whatsapp.groupId as ContactId, `${message.author.username}#${message.author.discriminator} : ` + message.content)
});

client.login(config.discord.token);