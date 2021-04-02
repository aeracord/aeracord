import { WelcomeScreen, WelcomeScreenData } from "../../internal";

export default function updateObject(welcomeScreen: WelcomeScreen, welcomeScreenData: WelcomeScreenData) {

    // Unmark as deleted
    if (welcomeScreen.deleted) welcomeScreen._unmarkAsDeleted();

    // Set data
    welcomeScreen.description = welcomeScreenData.description;
    welcomeScreen.channels = welcomeScreenData.channels;
}