import { MessageResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(messageResolvable: MessageResolvable): string | undefined {

    // Message
    if ((typeof messageResolvable === "object") && ("id" in messageResolvable)) return messageResolvable.id;

    // Message ID
    else if (isID(messageResolvable)) return messageResolvable;
}