export class DiscordAPIError {
    public code: number;
    public message: string;
    public errors: any;
    public method: string;
    public endpoint: string;

    constructor(code: number, message: string, errors: any, method: string, endpoint: string) {
        this.code = code;
        this.message = message;
        this.errors = errors;
        this.method = method;
        this.endpoint = endpoint;
    }
}