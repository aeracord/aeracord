import { Client, Template, TemplateData } from "../../internal";

export default function updateObjectFromData(client: Client, templateData: TemplateData) {

    // Get template from cache
    let template: Template | undefined = client.templates.get(templateData.code);

    // Update template object
    if (template) Template._updateObject(template, templateData);
}