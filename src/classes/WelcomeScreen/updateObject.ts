import { WelcomeScreen, WelcomeScreenData } from "../../internal";

export default function updateObject(welcomeScreen: WelcomeScreen, welcomeScreenData: WelcomeScreenData) {

    // Set data
    welcomeScreen.description = welcomeScreenData.description;
    welcomeScreen.channels = welcomeScreenData.channels;
}