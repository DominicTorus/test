"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePrismaCreateError = parsePrismaCreateError;
function parsePrismaCreateError(error) {
    const raw = error?.message || '';
    const invalidArgMatch = raw.match(/Invalid value for argument\s+`(.+?)`/);
    if (invalidArgMatch) {
        const field = invalidArgMatch[1];
        return `Argument \`${field}\` has invalid value.`;
    }
    if (raw.includes('Invalid value provided')) {
        const field = extractField(raw);
        return field
            ? `Invalid datatype for argument \`${field}\`.`
            : 'Invalid datatype sent to server.';
    }
    const enumMatch = raw.match(/Invalid value for argument\s+`(.+?)`.*Expected\s+(.+?)\./);
    if (enumMatch) {
        const field = enumMatch[1];
        const expected = enumMatch[2];
        return `Argument \`${field}\` has invalid value. Expected ${expected}.`;
    }
    if (raw.includes('PrismaClientValidationError')) {
        return 'Invalid data sent to server.';
    }
    return 'Something went wrong. Please check your inputs.';
}
function extractField(raw) {
    const match = raw.match(/Argument\s+`(.+?)`/);
    return match ? match[1] : null;
}
//# sourceMappingURL=prisma-error-handler.js.map