"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAbilities = exports.CHECK_ABILITY = void 0;
const common_1 = require("@nestjs/common");
exports.CHECK_ABILITY = 'check-ability';
const CheckAbilities = (...requirements) => (0, common_1.SetMetadata)(exports.CHECK_ABILITY, requirements);
exports.CheckAbilities = CheckAbilities;
//# sourceMappingURL=ability.decorator.js.map