import { DMChannel, DMChannelData } from "../../internal";

export default function updateObject(dmChannel: DMChannel, dmChannelData: DMChannelData) {

    // Set data
    dmChannel.recipient = dmChannelData.recipient;
}