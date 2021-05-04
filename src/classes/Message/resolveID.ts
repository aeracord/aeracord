import { MessageResolvable } from "../../internal";

export default function resolveID(messageResolvable: MessageResolvable): string | undefined {

    // Message
    if ((typeof messageResolvable === "object") && ("id" in messageResolvable)) return messageResolvable.id;

    // Message ID
    else if (typeof messageResolvable === "string") return messageResolvable;
}