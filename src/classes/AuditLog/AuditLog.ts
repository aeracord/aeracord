import { AuditLogData, AuditLogEntry, Client, RawAuditLogData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";

export default class AuditLog {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Guild ID
     *
     * The ID of the guild this audit log is in
     */
    guildID: string;

    /**
     * Entries
     *
     * The audit log's entries
     */
    entries: AuditLogEntry[];

    /**
     * Audit Log
     *
     * @param client The client
     * @param auditLogData Options to initialize this audit log with
     * @param auditLogData.guildID The ID of the guild this audit log is in
     * @param auditLogData.entries The audit log's entries
     */
    constructor(client: Client, auditLogData: AuditLogData) {

        // Set data
        this.client = client;
        this.guildID = auditLogData.guildID;
        this.entries = auditLogData.entries;
    }

    /**
     * From Raw Data
     *
     * Create an `AuditLogData` object from a `RawAuditLogData` object
     *
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this audit log is in
     *
     * @returns {AuditLogData} The audit log data
     */
    static _fromRawData(rawData: RawAuditLogData, guildID: string): AuditLogData {
        return fromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create an `AuditLog` from an `AuditLogData` object
     *
     * @param client The client
     * @param auditLogData The audit log data
     *
     * @returns {AuditLog} The audit log
     */
    static fromData(client: Client, auditLogData: AuditLogData): AuditLog {
        return fromData(client, auditLogData);
    }
}