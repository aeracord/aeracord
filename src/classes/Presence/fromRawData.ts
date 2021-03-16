import { PresenceData, RawPresenceData, RawPresenceDataActivity } from "../../internal";

export default function fromRawData(rawData: RawPresenceData): PresenceData {

    // Parse presence data
    return {
        user: {
            id: rawData.user.id,
            username: rawData.user.username,
            discriminator: rawData.user.discriminator,
            avatar: rawData.user.avatar || undefined,
            bot: rawData.user.bot,
            system: rawData.user.system,
            publicFlags: rawData.user.public_flags
        },
        status: rawData.status,
        activities: rawData.activities.map((a: RawPresenceDataActivity) => ({
            name: a.name,
            type: a.type,
            url: a.url || undefined,
            createdAt: a.created_at,
            timestamps: a.timestamps,
            applicationID: a.application_id,
            details: a.details || undefined,
            state: a.state || undefined,
            emoji: a.emoji ? {
                id: a.emoji.id,
                name: a.emoji.name,
                animated: Boolean(a.emoji.animated)
            } : undefined,
            party: a.party || undefined,
            assets: a.assets && {
                largeImage: a.assets.large_image,
                largeText: a.assets.large_text,
                smallImage: a.assets.small_image,
                smallText: a.assets.small_text
            },
            secrets: a.secrets,
            instance: Boolean(a.instance),
            flags: a.flags
        })),
        clientStatus: rawData.client_status
    };
}