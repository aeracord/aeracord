import { Client, WelcomeScreen, WelcomeScreenData } from "../../internal";

export default function updateObjectFromData(client: Client, welcomeScreenData: WelcomeScreenData): WelcomeScreen | undefined {

    // Get welcomeScreen from cache
    let welcomeScreen: WelcomeScreen | undefined = client.welcomeScreens.get(welcomeScreenData.guildID);

    // Update welcomeScreen object
    if (welcomeScreen) WelcomeScreen._updateObject(welcomeScreen, welcomeScreenData);

    // Return
    return welcomeScreen;
}