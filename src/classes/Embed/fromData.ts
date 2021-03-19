import { Client, Embed, EmbedData } from "../../internal";

export default function fromData(client: Client, embedData: EmbedData): Embed {

    // Create embed
    const embed: Embed = new Embed(client, embedData);

    // Return
    return embed;
}