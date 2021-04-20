export interface PermissionErrorData {
    permission?: string;
    role?: string;
    member?: string;
}

export default class PermissionError extends Error {

    /**
     * Message
     *
     * The error message
     */
    message: string;

    /**
     * Permission
     *
     * The missing permission
     */
    permission?: string;

    /**
     * Role
     *
     * The ID of the role that can't be managed
     */
    role?: string;

    /**
     * Member
     *
     * The user ID of the member that can't be managed
     */
    member?: string;

    /**
     * Permission Error
     *
     * @param permissionErrorData Options to initialize this permission error with
     * @param permissionErrorData.permission The missing permission
     * @param permissionErrorData.role The ID of the role that can't be managed
     * @param permissionErrorData.member The user ID of the member that can't be managed
     */
    constructor(permissionErrorData: PermissionErrorData) {

        // Parse message
        let message: string = "";
        if (permissionErrorData.permission) message = `Missing permission ${permissionErrorData.permission}`;
        else if (permissionErrorData.role) message = `Can't manage role ${permissionErrorData.role}`;
        else if (permissionErrorData.member) message = `Can't manage member ${permissionErrorData.member}`;

        // Super
        super(message);

        // Set data
        this.message = message;
        this.permission = permissionErrorData.permission;
        this.role = permissionErrorData.role;
        this.member = permissionErrorData.member;
    }
}