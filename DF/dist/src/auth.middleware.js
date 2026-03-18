"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const fastify_plugin_1 = require("fastify-plugin");
const authPlugin = (commonService) => {
    const plugin = async (fastify) => {
        fastify.addHook('preHandler', async (req, res) => {
            const body = req.body;
            if (req.headers.authorization === undefined) {
                const err = await commonService.getTSL(body.key, '', 'Given token not found', 400);
                throw new common_1.NotAcceptableException(err);
            }
            console.log("Execution started...");
        });
    };
    return (0, fastify_plugin_1.default)(plugin);
};
exports.default = authPlugin;
//# sourceMappingURL=auth.middleware.js.map