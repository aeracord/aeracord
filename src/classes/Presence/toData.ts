import { Activity, Presence, PresenceData } from "../../internal";

export default function toData(presence: Presence): PresenceData {

    // Parse presence data
    return {
        user: {
            id: presence.user.id,
            username: presence.user.username,
            discriminator: presence.user.discriminator,
            avatar: presence.user.avatar,
            bot: presence.user.bot,
            system: presence.user.system,
            publicFlags: presence.user.publicFlags
        },
        status: presence.status,
        activities: presence.activities.map((a: Activity) => ({
            name: a.name,
            type: a.type,
            url: a.url,
            createdAt: a.createdAt,
            timestamps: a.timestamps && {
                start: a.timestamps.start,
                end: a.timestamps.end
            },
            applicationID: a.applicationID,
            details: a.details,
            state: a.state,
            emoji: a.emoji && {
                id: a.emoji.id,
                name: a.emoji.name,
                animated: a.emoji.animated
            },
            party: a.party && {
                id: a.party.id,
                size: a.party.size
            },
            assets: a.assets && {
                largeImage: a.assets.largeImage,
                largeText: a.assets.largeText,
                smallImage: a.assets.smallImage,
                smallText: a.assets.smallText
            },
            secrets: a.secrets && {
                join: a.secrets.join,
                spectate: a.secrets.spectate,
                match: a.secrets.match
            },
            instance: a.instance,
            flags: a.flags
        })),
        clientStatus: {
            desktop: presence.clientStatus.desktop,
            mobile: presence.clientStatus.mobile,
            web: presence.clientStatus.web
        },
        fetchedAt: presence._lastUpdatedAt
    };
}