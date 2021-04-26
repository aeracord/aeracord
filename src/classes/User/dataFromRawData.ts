import { RawUserData, UserData } from "../../internal";

export default function dataFromRawData(rawData: RawUserData): UserData {

    // Parse user data
    return {
        id: rawData.id,
        username: rawData.username,
        discriminator: rawData.discriminator,
        avatarHash: rawData.avatar,
        bot: Boolean(rawData.bot),
        system: Boolean(rawData.system),
        publicFlags: rawData.public_flags || 0,
        fetchedAt: Date.now()
    };
}