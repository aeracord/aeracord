import { Client } from "../../../../internal";
import { PresenceUpdateData } from "./presenceUpdateData";
import { RawPresenceUpdateData, RawPresenceUpdateDataActivity } from "./rawPresenceUpdateData";

export default function presenceUpdate(client: Client, rawData: RawPresenceUpdateData) {

    // Parse data
    const data: PresenceUpdateData = {
        user: {
            id: rawData.user.id,
            username: rawData.user.username,
            discriminator: rawData.user.discriminator,
            avatar: rawData.user.avatar || undefined,
            bot: rawData.user.bot,
            system: rawData.user.system,
            publicFlags: rawData.user.public_flags
        },
        guildID: rawData.guild_id,
        status: rawData.status,
        activities: rawData.activities.map((a: RawPresenceUpdateDataActivity) => ({
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

    // Emit event
    client.emit("presenceUpdate", data, rawData);
}