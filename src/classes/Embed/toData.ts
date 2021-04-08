import { Embed, EmbedData, EmbedField } from "../../internal";

export default function toData(embed: Embed): EmbedData {

    // Parse embed data
    return {
        messageID: embed.messageID,
        channelID: embed.channelID,
        guildID: embed.guildID,
        title: embed.title,
        type: embed.type,
        description: embed.description,
        url: embed.url,
        timestamp: embed.timestamp,
        color: embed.color,
        footer: embed.footer && {
            text: embed.footer.text,
            iconURL: embed.footer.iconURL,
            proxyIconURL: embed.footer.proxyIconURL
        },
        image: embed.image && {
            url: embed.image.url,
            proxyURL: embed.image.proxyURL,
            width: embed.image.width,
            height: embed.image.height
        },
        thumbnail: embed.thumbnail && {
            url: embed.thumbnail.url,
            proxyURL: embed.thumbnail.proxyURL,
            width: embed.thumbnail.width,
            height: embed.thumbnail.height
        },
        video: embed.video && {
            url: embed.video.url,
            proxyURL: embed.video.proxyURL,
            width: embed.video.width,
            height: embed.video.height
        },
        provider: embed.provider && {
            name: embed.provider.name,
            url: embed.provider.url
        },
        author: embed.author && {
            name: embed.author.name,
            url: embed.author.url,
            iconURL: embed.author.iconURL,
            proxyIconURL: embed.author.proxyIconURL
        },
        fields: embed.fields.map((f: EmbedField) => ({
            name: f.name,
            value: f.value,
            inline: f.inline
        }))
    };
}