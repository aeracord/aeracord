import { Interaction, InteractionResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(interactionResolvable: InteractionResolvable): string | undefined {

    // Interaction
    if (interactionResolvable instanceof Interaction) return interactionResolvable.id;

    // User ID
    else if (isID(interactionResolvable)) return interactionResolvable;
}