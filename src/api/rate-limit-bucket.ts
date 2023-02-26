export class RateLimitBucket {
    public bucket: string | null = '';
    public limit = 0;
    public remain = 0;
    public resetTime = 0;
    public resetAfter = 0;
}