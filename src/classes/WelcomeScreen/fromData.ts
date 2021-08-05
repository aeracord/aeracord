import { Client, WelcomeScreen, WelcomeScreenData } from "../../internal";

export default function fromData(client: Client, welcomeScreenData: WelcomeScreenData): WelcomeScreen {

    // Get welcome screen from cache
    let welcomeScreen: WelcomeScreen | undefined = client.welcomeScreens.get(welcomeScreenData.guildID);

    // Create welcome screen
    if (!welcomeScreen) welcomeScreen = new WelcomeScreen(client, welcomeScreenData);

    // Return
    return welcomeScreen;
}