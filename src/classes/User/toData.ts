import { User, UserData } from "../../internal";

export default function toData(user: User): UserData {

    // Parse user data
    return {
        id: user.id,
        username: user.username,
        discriminator: user.discriminator,
        avatarHash: user.avatarHash,
        bot: user.bot,
        system: user.system,
        publicFlags: user.publicFlags,
        fetchedAt: user._lastUpdatedAt
    };
}