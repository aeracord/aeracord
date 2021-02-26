import { Client, FetchQueue, Guild, GuildMembershipScreeningForm, GuildMembershipScreeningFormField, GuildResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseGuildMembershipScreeningForm from "../events/parseGuildMembershipScreeningForm";
import { RawGuildMembershipScreeningFormData } from "../events/rawGuildMembershipScreeningFormData";

export interface ModifyGuildMembershipScreeningFormData {
    enabled?: boolean;
    description?: string;
    fields?: GuildMembershipScreeningFormField[];
}

export default async function modifyGuildMembershipScreeningForm(client: Client, guildResolvable: GuildResolvable, modifyGuildMembershipScreeningFormData: ModifyGuildMembershipScreeningFormData): Promise<GuildMembershipScreeningForm> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/member-verification`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawGuildMembershipScreeningFormData = await fetchQueue.request({
        path,
        method,
        data: {
            enabled: modifyGuildMembershipScreeningFormData.enabled,
            description: modifyGuildMembershipScreeningFormData.description,
            form_fields: modifyGuildMembershipScreeningFormData.fields && JSON.stringify(modifyGuildMembershipScreeningFormData.fields.map((f: GuildMembershipScreeningFormField) => ({
                field_type: f.type,
                label: f.label,
                values: f.values,
                required: f.required
            })))
        }
    });

    // Parse guild membership screening form
    const guildMembershipScreeningForm: GuildMembershipScreeningForm = parseGuildMembershipScreeningForm(result);

    // Return
    return guildMembershipScreeningForm;
}