import { CommandResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(commandResolvable: CommandResolvable): string | undefined {

    // Command
    if ((typeof commandResolvable === "object") && ("id" in commandResolvable)) return commandResolvable.id;

    // Command ID
    else if (isID(commandResolvable)) return commandResolvable;
}