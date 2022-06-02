import { Client, create, Message } from "@open-wa/wa-automate";
import { TextChannel } from "discord.js";
import config from "../config/config";
import { DCClient } from "../discord";

let WAClient:Client | false = false;
export const getClient = () => WAClient

create().then(async client => {

    const channel = await DCClient.channels.fetch(config.discord.channel) as TextChannel | null
    if (!channel) return

    client.onMessage(async (message:Message) => {
        if (message.isGroupMsg && message.from !== config.whatsapp.groupId) return 
        channel.send(`${message.sender.pushname || message.sender.id.replace("@c.us", "")} : ` + message.text);
    })
    WAClient = client
    channel.send("WhatsApp client ready")
})