export interface APIErrorData {
    code: number;
    message: string;
    path: string;
    method: string;
    errors?: any;
}

export default class APIError extends Error {

    /**
     * Code
     *
     * The error code
     */
    code: number;

    /**
     * Message
     *
     * The error message
     */
    message: string;

    /**
     * Path
     *
     * The path of the API endpoint that was called
     */
    path: string;

    /**
     * Method
     *
     * The HTTP method used to call the API endpoint
     */
    method: string;

    /**
     * Errors
     *
     * The request's errors
     */
    errors?: any;

    /**
     * API Error
     *
     * @param apiErrorData Options to initialize this API error with
     * @param apiErrorData.code The error code
     * @param apiErrorData.message The error message
     * @param apiErrorData.path The path of the API endpoint that was called
     * @param apiErrorData.method The HTTP method used to call the API endpoint
     * @param apiErrorData.errors The request's errors
     */
    constructor(apiErrorData: APIErrorData) {

        // Parse message
        const message: string = `Discord API error at ${apiErrorData.method} ${apiErrorData.path}: ${apiErrorData.code} ${apiErrorData.message}`;

        // Super
        super(message);

        // Capture stack trace
        Error.captureStackTrace(this, APIError);

        // Set data
        this.name = "APIError";
        this.code = apiErrorData.code;
        this.message = message;
        this.path = apiErrorData.path;
        this.method = apiErrorData.method;
        this.errors = apiErrorData.errors;
    }
}