import { PresenceData, RawPresenceData, RawPresenceDataActivity } from "../../internal";

export default function fromRawData(rawData: RawPresenceData): PresenceData {

    // Parse presence data
    return {
        user: {
            id: rawData.user.id,
            username: rawData.user.username,
            discriminator: rawData.user.discriminator,
            avatar: rawData.user.avatar,
            bot: rawData.user.bot,
            system: rawData.user.system,
            publicFlags: rawData.user.public_flags
        },
        status: rawData.status,
        activities: rawData.activities.map((a: RawPresenceDataActivity) => ({
            name: a.name,
            type: a.type,
            url: a.url || null,
            createdAt: a.created_at,
            timestamps: a.timestamps ? {
                start: a.timestamps.start || null,
                end: a.timestamps.end || null
            } : null,
            applicationID: a.application_id || null,
            details: a.details || null,
            state: a.state || null,
            emoji: a.emoji ? {
                id: a.emoji.id || null,
                name: a.emoji.name,
                animated: Boolean(a.emoji.animated)
            } : null,
            party: a.party ? {
                id: a.party.id || null,
                size: a.party.size || null
            } : null,
            assets: a.assets ? {
                largeImage: a.assets.large_image || null,
                largeText: a.assets.large_text || null,
                smallImage: a.assets.small_image || null,
                smallText: a.assets.small_text || null
            } : null,
            secrets: a.secrets ? {
                join: a.secrets.join || null,
                spectate: a.secrets.spectate || null,
                match: a.secrets.match || null
            } : null,
            instance: Boolean(a.instance),
            flags: a.flags || null
        })),
        clientStatus: {
            desktop: rawData.client_status.desktop || null,
            mobile: rawData.client_status.mobile || null,
            web: rawData.client_status.web || null
        }
    };
}