export class BadRequestException implements Error {
    name: string;
    message: string;
    stack?: string | undefined;
    constructor(message: string) {
        this.name = 'BadRequestException';
        this.message = message;
    }
}
