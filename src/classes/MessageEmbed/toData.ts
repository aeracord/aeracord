import { MessageEmbed, MessageEmbedData, MessageEmbedField } from "../../internal";

export default function toData(messageEmbed: MessageEmbed): MessageEmbedData {

    // Parse message embed data
    return {
        messageID: messageEmbed.messageID,
        channelID: messageEmbed.channelID,
        guildID: messageEmbed.guildID,
        title: messageEmbed.title,
        type: messageEmbed.type,
        description: messageEmbed.description,
        url: messageEmbed.url,
        timestamp: messageEmbed.timestamp,
        color: messageEmbed.color,
        footer: messageEmbed.footer && {
            text: messageEmbed.footer.text,
            iconURL: messageEmbed.footer.iconURL,
            proxyIconURL: messageEmbed.footer.proxyIconURL
        },
        image: messageEmbed.image && {
            url: messageEmbed.image.url,
            proxyURL: messageEmbed.image.proxyURL,
            width: messageEmbed.image.width,
            height: messageEmbed.image.height
        },
        thumbnail: messageEmbed.thumbnail && {
            url: messageEmbed.thumbnail.url,
            proxyURL: messageEmbed.thumbnail.proxyURL,
            width: messageEmbed.thumbnail.width,
            height: messageEmbed.thumbnail.height
        },
        video: messageEmbed.video && {
            url: messageEmbed.video.url,
            proxyURL: messageEmbed.video.proxyURL,
            width: messageEmbed.video.width,
            height: messageEmbed.video.height
        },
        provider: messageEmbed.provider && {
            name: messageEmbed.provider.name,
            url: messageEmbed.provider.url
        },
        author: messageEmbed.author && {
            name: messageEmbed.author.name,
            url: messageEmbed.author.url,
            iconURL: messageEmbed.author.iconURL,
            proxyIconURL: messageEmbed.author.proxyIconURL
        },
        fields: messageEmbed.fields.map((f: MessageEmbedField) => ({
            name: f.name,
            value: f.value,
            inline: f.inline
        }))
    };
}