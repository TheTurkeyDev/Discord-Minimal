export default class DiscordAPIError {
    public code: number;
    public message: string;
    public endpoint: string;

    constructor(code: number, message: string, endpoint: string) {
        this.code = code;
        this.message = message;
        this.endpoint = endpoint;
    }
}