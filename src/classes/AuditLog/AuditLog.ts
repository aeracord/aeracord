import { AuditLogData, AuditLogEntry, Client, RawAuditLogData } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";

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
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this audit log is in
     *
     * @returns {AuditLog} The audit log
     */
    static _fromRawData(client: Client, rawData: RawAuditLogData, guildID: string): AuditLog {
        return AuditLog.fromData(client, AuditLog._dataFromRawData(rawData, guildID));
    }

    /**
     * Data From Raw Data
     *
     * Create an `AuditLogData` object from a `RawAuditLogData` object
     *
     * @private
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this audit log is in
     *
     * @returns {AuditLogData} The audit log data
     */
    static _dataFromRawData(rawData: RawAuditLogData, guildID: string): AuditLogData {
        return dataFromRawData(rawData, guildID);
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

    /**
     * To Data
     *
     * Create an `AuditLogData` object from an `AuditLog`
     *
     * @param auditLog The audit log
     *
     * @returns {AuditLogData} The audit log data
     */
    static toData(auditLog: AuditLog): AuditLogData {
        return toData(auditLog);
    }
}