import { Template, TemplateResolvable } from "../../internal";

export default function resolveCode(templateResolvable: TemplateResolvable): string {

    // Template
    if (templateResolvable instanceof Template) return templateResolvable.code;

    // Template code
    else return templateResolvable;
}