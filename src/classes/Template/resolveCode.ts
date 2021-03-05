import { Template, TemplateResolvable } from "../../internal";

export default function resolveCode(templateResolvable: TemplateResolvable): string | undefined {

    // Template
    if (templateResolvable instanceof Template) return templateResolvable.code;

    // Template code
    else if (/^[a-zA-Z0-9]$/.test(templateResolvable)) return templateResolvable;
}