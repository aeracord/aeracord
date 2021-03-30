import { Client, Template, TemplateData } from "../../internal";

export default function fromData(client: Client, templateData: TemplateData): Template {

    // Update cached template
    let template: Template | undefined = Template._updateObjectFromData(client, templateData);

    // Create template
    if (!template) template = new Template(client, templateData);

    // Return
    return template;
}