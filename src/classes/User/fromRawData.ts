import { RawUserData, UserData } from "../../internal";

export default function fromRawData(rawData: RawUserData): UserData {

    // Parse user data
    return {
        id: rawData.id,
        username: rawData.username,
        discriminator: rawData.discriminator,
        avatar: rawData.avatar || undefined,
        bot: rawData.bot,
        system: rawData.system,
        publicFlags: rawData.public_flags || 0
    };
}