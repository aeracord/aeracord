import { User, UserData } from "../../internal";

export default function updateObject(user: User, userData: UserData) {

    // Set data
    user.username = userData.username;
    user.discriminator = userData.discriminator;
    user.avatar = userData.avatar;
    user.bot = Boolean(userData.bot);
    user.system = Boolean(userData.system);
    user.publicFlags = userData.publicFlags;
}