import { InteractionResolvable } from "../../internal";

export default function resolveID(interactionResolvable: InteractionResolvable): string | undefined {

    // Interaction
    if ((typeof interactionResolvable === "object") && ("id" in interactionResolvable)) return interactionResolvable.id;

    // User ID
    else if (typeof interactionResolvable === "string") return interactionResolvable;
}