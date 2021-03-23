import { EmbedData, RawEmbedData, RawEmbedDataField, RawEmbedMetadata } from "../../internal";

export default function fromRawData(rawData: RawEmbedData, metadata: RawEmbedMetadata): EmbedData {

    // Parse embed data
    return {
        messageID: metadata.messageID,
        channelID: metadata.channelID,
        guildID: metadata.guildID,
        title: rawData.title || null,
        type: rawData.type || null,
        description: rawData.description || null,
        url: rawData.url || null,
        timestamp: rawData.timestamp ? new Date(rawData.timestamp).getTime() : null,
        color: rawData.color || null,
        footer: rawData.footer ? {
            text: rawData.footer.text,
            iconURL: rawData.footer.icon_url || null,
            proxyIconURL: rawData.footer.proxy_icon_url || null
        } : null,
        image: rawData.image ? {
            url: rawData.image.url || null,
            proxyURL: rawData.image.proxy_url || null,
            width: rawData.image.width || null,
            height: rawData.image.height || null
        } : null,
        thumbnail: rawData.thumbnail ? {
            url: rawData.thumbnail.url || null,
            proxyURL: rawData.thumbnail.proxy_url || null,
            width: rawData.thumbnail.width || null,
            height: rawData.thumbnail.height || null
        } : null,
        video: rawData.video ? {
            url: rawData.video.url || null,
            proxyURL: rawData.video.proxy_url || null,
            width: rawData.video.width || null,
            height: rawData.video.height || null
        } : null,
        provider: rawData.provider ? {
            name: rawData.provider.name || null,
            url: rawData.provider.url || null
        } : null,
        author: rawData.author ? {
            name: rawData.author.name || null,
            url: rawData.author.url || null,
            iconURL: rawData.author.icon_url || null,
            proxyIconURL: rawData.author.proxy_icon_url || null
        } : null,
        fields: rawData.fields ? rawData.fields.map((f: RawEmbedDataField) => ({
            name: f.name,
            value: f.value,
            inline: Boolean(f.inline)
        })) : []
    };
}