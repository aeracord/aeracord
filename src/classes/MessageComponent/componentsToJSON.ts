import { Component, COMPONENT_TYPE_ACTION_ROW, COMPONENT_TYPE_BUTTON, COMPONENT_TYPE_SELECT_MENU, SelectMenuComponentOption } from "../../internal";

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
            label: c.label.toString(),
            emoji: c.emoji && (/^[0-9]+$/.test(c.emoji) ? { id: c.emoji } : { name: c.emoji }),
            custom_id: c.customID?.toString(),
            url: c.url,
            disabled: c.disabled
        };

        // Parse select menu component
        else if (c.type === COMPONENT_TYPE_SELECT_MENU) return {
            type: c.type,
            placeholder: c.placeholder?.toString(),
            min_values: c.minimumValues,
            max_values: c.maximumValues,
            custom_id: c.customID.toString(),
            options: c.options.map((o: SelectMenuComponentOption) => ({
                label: o.label.toString(),
                description: o.description?.toString(),
                value: o.value.toString(),
                emoji: o.emoji && (/^[0-9]+$/.test(o.emoji) ? { id: o.emoji } : { name: o.emoji }),
                default: o.default
            }))
        };
    });
}