import { Client, WelcomeScreen, WelcomeScreenData } from "../../internal";

export default function fromRawData(client: Client, welcomeScreenData: WelcomeScreenData): WelcomeScreen {

    // Create welcome screen
    const welcomeScreen: WelcomeScreen = new WelcomeScreen(client, welcomeScreenData);

    // Return
    return welcomeScreen;
}