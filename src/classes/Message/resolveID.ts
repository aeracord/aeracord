import { Message, MessageResolvable } from "../../internal";

export default function resolveID(messageResolvable: MessageResolvable): string {

    // Message
    if (messageResolvable instanceof Message) return messageResolvable.id;

    // Message ID
    else return messageResolvable;
}