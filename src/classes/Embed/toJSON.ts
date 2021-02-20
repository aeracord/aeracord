import { Embed, EmbedField } from "../../internal";

export default function toJSON(embed: Embed): object {

    // Return
    return {
        title: embed.title,
        description: embed.description,
        url: embed.url,
        timestamp: embed.timestamp ? new Date(embed.timestamp).toISOString() : undefined,
        color: embed.color,
        footer: embed.footer && {
            text: embed.footer.text,
            icon_url: embed.footer.iconURL
        },
        image: embed.image && {
            url: embed.image.url
        },
        thumbnail: embed.thumbnail && {
            url: embed.thumbnail.url
        },
        author: embed.author && {
            name: embed.author.name,
            url: embed.author.url,
            icon_url: embed.author.iconURL
        },
        fields: embed.fields.map((f: EmbedField) => ({
            name: f.name,
            value: f.value,
            inline: f.inline
        }))
    };
}