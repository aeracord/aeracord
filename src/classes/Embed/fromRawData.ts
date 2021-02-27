import { Client, Embed, RawEmbedData, RawEmbedDataField } from "../../internal";

export default function fromRawData(client: Client, rawData: RawEmbedData): Embed {

    // Parse embed
    const embed: Embed = new Embed(client, {
        title: rawData.title,
        type: rawData.type,
        description: rawData.description,
        url: rawData.url,
        timestamp: rawData.timestamp ? new Date(rawData.timestamp).getTime() : undefined,
        color: rawData.color,
        footer: rawData.footer && {
            text: rawData.footer.text,
            iconURL: rawData.footer.icon_url,
            proxyIconURL: rawData.footer.proxy_icon_url
        },
        image: rawData.image && {
            url: rawData.image.url,
            proxyURL: rawData.image.proxy_url,
            width: rawData.image.width,
            height: rawData.image.height
        },
        thumbnail: rawData.thumbnail && {
            url: rawData.thumbnail.url,
            proxyURL: rawData.thumbnail.proxy_url,
            width: rawData.thumbnail.width,
            height: rawData.thumbnail.height
        },
        video: rawData.video && {
            url: rawData.video.url,
            proxyURL: rawData.video.proxy_url,
            width: rawData.video.width,
            height: rawData.video.height
        },
        provider: rawData.provider && {
            name: rawData.provider.name,
            url: rawData.provider.url
        },
        author: rawData.author && {
            name: rawData.author.name,
            url: rawData.author.url,
            iconURL: rawData.author.icon_url,
            proxyIconURL: rawData.author.proxy_icon_url
        },
        fields: rawData.fields ? rawData.fields.map((f: RawEmbedDataField) => ({
            name: f.name,
            value: f.value,
            inline: Boolean(f.inline)
        })) : []
    });

    // Return
    return embed;
}