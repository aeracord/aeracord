import { Client, Invite, User } from "../../../../internal";
import { RawInviteCreateData } from "./rawInviteCreateData";

export default function inviteCreate(client: Client, rawData: RawInviteCreateData) {

    // Parse invite
    const invite: Invite = new Invite(client, {
        code: rawData.code,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id,
        createdAt: new Date(rawData.created_at).getTime(),
        inviter: rawData.inviter && User._fromRawData(client, rawData.inviter),
        maxAge: rawData.max_age || undefined,
        maxUses: rawData.max_uses || undefined,
        temporary: rawData.temporary,
        uses: rawData.uses,
        targetUser: rawData.target_user && {
            id: rawData.target_user.id,
            username: rawData.target_user.username,
            discriminator: rawData.target_user.discriminator,
            avatar: rawData.target_user.avatar || undefined
        },
        targetUserType: rawData.target_user_type
    });

    // Emit event
    client.emit("inviteCreate", invite, rawData);
}