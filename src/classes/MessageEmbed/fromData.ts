import { Client, MessageEmbed, MessageEmbedData } from "../../internal";

export default function fromData(client: Client, messageEmbedData: MessageEmbedData): MessageEmbed {

    // Create message embed
    const messageEmbed: MessageEmbed = new MessageEmbed(client, messageEmbedData);

    // Return
    return messageEmbed;
}