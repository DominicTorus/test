"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAcceptableException = exports.ConflictException = exports.ForbiddenException = exports.UnauthorizedException = exports.NotFoundException = exports.BadRequestException = exports.CustomException = void 0;
const common_1 = require("@nestjs/common");
class CustomException extends common_1.HttpException {
    constructor(message, statusCode) {
        super(message, statusCode);
    }
}
exports.CustomException = CustomException;
class BadRequestException extends CustomException {
    constructor(message) {
        super(message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BadRequestException = BadRequestException;
class NotFoundException extends CustomException {
    constructor(message) {
        super(message, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends CustomException {
    constructor(message) {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends CustomException {
    constructor(message) {
        super(message, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
class ConflictException extends CustomException {
    constructor(message) {
        super(message, common_1.HttpStatus.CONFLICT);
    }
}
exports.ConflictException = ConflictException;
class NotAcceptableException extends CustomException {
    constructor(message) {
        super(message, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
}
exports.NotAcceptableException = NotAcceptableException;
//# sourceMappingURL=customException.js.map