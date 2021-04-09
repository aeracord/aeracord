import { Command, CommandResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(commandResolvable: CommandResolvable): string | undefined {

    // Command
    if (commandResolvable instanceof Command) return commandResolvable.id;

    // Command ID
    else if (isID(commandResolvable)) return commandResolvable;
}