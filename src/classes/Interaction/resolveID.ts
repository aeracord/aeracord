import { InteractionResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(interactionResolvable: InteractionResolvable): string | undefined {

    // Interaction
    if ((typeof interactionResolvable === "object") && ("id" in interactionResolvable)) return interactionResolvable.id;

    // User ID
    else if (isID(interactionResolvable)) return interactionResolvable;
}