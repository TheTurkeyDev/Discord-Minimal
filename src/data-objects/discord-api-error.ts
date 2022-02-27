export class DiscordAPIError
{
    public code: number;
    public message: string;
    public errors: any;
    public endpoint: string;

    constructor(code: number, message: string, errors: any, endpoint: string)
    {
        this.code = code;
        this.message = message;
        this.errors = errors;
        this.endpoint = endpoint;
    }
}