import { User, UserData } from "../../internal";

export default function updateObject(user: User, userData: UserData) {

    // If the `UserData` was fetched before the `User` object was last updated, dont update anything
    if (userData.fetchedAt < user._lastUpdatedAt) return;

    // Unmark as deleted
    if (user.deleted) user._unmarkAsDeleted();

    // Set data
    user.username = userData.username;
    user.discriminator = userData.discriminator;
    user.avatarHash = userData.avatarHash;
    user.bot = userData.bot;
    user.system = userData.system;
    user.publicFlags = userData.publicFlags;
    user._lastUpdatedAt = Date.now();
}