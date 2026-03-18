import { HttpException, HttpStatus } from '@nestjs/common';
export declare class CustomException extends HttpException {
    constructor(message: string, statusCode: HttpStatus);
}
export declare class BadRequestException extends CustomException {
    constructor(message: string);
}
export declare class NotFoundException extends CustomException {
    constructor(message: string);
}
export declare class UnauthorizedException extends CustomException {
    constructor(message: string);
}
export declare class ForbiddenException extends CustomException {
    constructor(message: string);
}
export declare class ConflictException extends CustomException {
    constructor(message: string);
}
export declare class NotAcceptableException extends CustomException {
    constructor(message: string);
}
