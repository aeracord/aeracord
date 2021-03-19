import { Client, Template, TemplateData } from "../../internal";

export default function fromData(client: Client, templateData: TemplateData): Template {

    // Get template from cache
    let template: Template | undefined = client.templates.get(templateData.code);

    // Update template object
    if (template) Template._updateObject(template, templateData);

    // Create template
    else template = new Template(client, templateData);

    // Return
    return template;
}