import { Client, WelcomeScreen, WelcomeScreenData } from "../../internal";

export default function updateObjectFromData(client: Client, welcomeScreenData: WelcomeScreenData) {

    // Get welcome screen from cache
    let welcomeScreen: WelcomeScreen | undefined = client.welcomeScreens.get(welcomeScreenData.guildID);

    // Update welcome screen object
    if (welcomeScreen) WelcomeScreen._updateObject(welcomeScreen, welcomeScreenData);
}