import { Component, COMPONENT_TYPE_ACTION_ROW, COMPONENT_TYPE_BUTTON } from "../../internal";

export default function componentsToJSON(components: Component[]): object {

    // Return
    return components.map((c: Component) => {

        // Parse action row component
        if (c.type === COMPONENT_TYPE_ACTION_ROW) return {
            type: c.type,
            components: componentsToJSON(c.components)
        };

        // Parse button component
        else if (c.type === COMPONENT_TYPE_BUTTON) return {
            type: c.type,
            style: c.style,
            label: c.label?.toString(),
            emoji: c.emoji && (/^[0-9]+$/.test(c.emoji) ? { id: c.emoji } : { name: c.emoji }),
            custom_id: c.customID?.toString(),
            url: c.url,
            disabled: c.disabled
        };
    });
}