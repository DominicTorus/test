"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleService = void 0;
const zen_engine_1 = require("@gorules/zen-engine");
class RuleService {
    async goRule(content, data) {
        const engine = new zen_engine_1.ZenEngine();
        const decision = engine.createDecision(content);
        const result = await decision.evaluate(data);
        engine.dispose();
        return result;
    }
}
exports.RuleService = RuleService;
//# sourceMappingURL=ruleService.js.map