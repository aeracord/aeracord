import { Client, Template, TemplateData } from "../../internal";

export default function fromData(client: Client, templateData: TemplateData): Template {

    // Get template from cache
    let template: Template | undefined = client.templates.get(templateData.code);

    // Create template
    if (!template) template = new Template(client, templateData);

    // Return
    return template;
}