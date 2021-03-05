import { Message, MessageResolvable } from "../../internal";

export default function resolveID(messageResolvable: MessageResolvable): string | undefined {

    // Message
    if (messageResolvable instanceof Message) return messageResolvable.id;

    // Message ID
    else if (/^[0-9]{17,}$/.test(messageResolvable)) return messageResolvable;
}