import { Client, Template, TemplateData } from "../../internal";

export default function fromData(client: Client, templateData: TemplateData): Template {

    // Create template
    const template: Template = new Template(client, templateData);

    // Return
    return template;
}