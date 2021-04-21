import { MessageEmbed, MessageEmbedField } from "../../internal";

export default function toJSON(messageEmbed: MessageEmbed): object {

    // Return
    return {
        title: messageEmbed.title,
        description: messageEmbed.description,
        url: messageEmbed.url,
        timestamp: messageEmbed.timestamp ? new Date(messageEmbed.timestamp).toISOString() : undefined,
        color: messageEmbed.color,
        footer: messageEmbed.footer && {
            text: messageEmbed.footer.text,
            icon_url: messageEmbed.footer.iconURL
        },
        image: messageEmbed.image && {
            url: messageEmbed.image.url
        },
        thumbnail: messageEmbed.thumbnail && {
            url: messageEmbed.thumbnail.url
        },
        author: messageEmbed.author && {
            name: messageEmbed.author.name,
            url: messageEmbed.author.url,
            icon_url: messageEmbed.author.iconURL
        },
        fields: messageEmbed.fields.map((f: MessageEmbedField) => ({
            name: f.name,
            value: f.value,
            inline: f.inline
        }))
    };
}