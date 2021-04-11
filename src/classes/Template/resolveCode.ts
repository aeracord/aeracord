import { TemplateResolvable } from "../../internal";

export default function resolveCode(templateResolvable: TemplateResolvable): string | undefined {

    // Template
    if ((typeof templateResolvable === "object") && ("code" in templateResolvable)) return templateResolvable.code;

    // Template code
    else if (/^[a-zA-Z0-9]+$/.test(templateResolvable)) return templateResolvable;
}