import { User, UserData } from "../../internal";

export default function updateObject(user: User, userData: UserData) {

    // Unmark as deleted
    if (user.deleted) user._unmarkAsDeleted();

    // Set data
    user.username = userData.username;
    user.discriminator = userData.discriminator;
    user.avatar = userData.avatar;
    user.bot = userData.bot;
    user.system = userData.system;
    user.publicFlags = userData.publicFlags;
}