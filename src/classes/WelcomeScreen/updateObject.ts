import { WelcomeScreen, WelcomeScreenData } from "../../internal";

export default function updateObject(welcomeScreen: WelcomeScreen, welcomeScreenData: WelcomeScreenData) {

    // If the `WelcomeScreenData` was fetched before the `WelcomeScreen` object was last updated, dont update anything
    if (welcomeScreenData.fetchedAt < welcomeScreen._lastUpdatedAt) return;

    // Unmark as deleted
    if (welcomeScreen.deleted) welcomeScreen._unmarkAsDeleted();

    // Set data
    welcomeScreen.description = welcomeScreenData.description;
    welcomeScreen.channels = welcomeScreenData.channels;
    welcomeScreen._lastUpdatedAt = Date.now();
}