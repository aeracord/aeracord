import { Template, TemplateData } from "../../internal";

export default function updateObject(template: Template, templateData: TemplateData) {

    // Unmark as deleted
    if (template.deleted) template._unmarkAsDeleted();

    // Set data
    template.name = templateData.name;
    template.description = templateData.description;
    template.uses = templateData.uses;
    template.creator = templateData.creator;
    template.createdAt = templateData.createdAt;
    template.updatedAt = templateData.updatedAt;
    template.sourceGuildID = templateData.sourceGuildID;
    template.sourceGuild = templateData.sourceGuild;
    template.dirty = templateData.dirty;
}