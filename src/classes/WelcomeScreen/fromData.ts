import { Client, WelcomeScreen, WelcomeScreenData } from "../../internal";

export default function fromData(client: Client, welcomeScreenData: WelcomeScreenData): WelcomeScreen {

    // Update cached welcome screen
    let welcomeScreen: WelcomeScreen | undefined = WelcomeScreen._updateObjectFromData(client, welcomeScreenData);

    // Create welcome screen
    if (!welcomeScreen) welcomeScreen = new WelcomeScreen(client, welcomeScreenData);

    // Return
    return welcomeScreen;
}