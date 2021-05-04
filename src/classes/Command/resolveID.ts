import { CommandResolvable } from "../../internal";

export default function resolveID(commandResolvable: CommandResolvable): string | undefined {

    // Command
    if ((typeof commandResolvable === "object") && ("id" in commandResolvable)) return commandResolvable.id;

    // Command ID
    else if (typeof commandResolvable === "string") return commandResolvable;
}