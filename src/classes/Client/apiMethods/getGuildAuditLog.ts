import queryString from "query-string";
import { AuditLog, AuditLogData, AuditLogEvent, Client, FetchQueue, Guild, GuildResolvable, RawAuditLogData, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface GetGuildAuditLogData {
    user?: UserResolvable;
    event?: AuditLogEvent;
    before?: string;
    limit?: number;
}

export default async function getGuildAuditLog(client: Client, guildResolvable: GuildResolvable, getGuildAuditLogData: GetGuildAuditLogData = {}): Promise<AuditLogData> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/audit-logs?${queryString.stringify({
        user_id: getGuildAuditLogData.user,
        action_type: getGuildAuditLogData.event,
        before: getGuildAuditLogData.before,
        limit: getGuildAuditLogData.limit
    })}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawAuditLogData = await fetchQueue.request({
        path,
        method
    });

    // Parse audit log data
    const auditLogData: AuditLogData = AuditLog._fromRawData(result, guildID);

    // Return
    return auditLogData;
}