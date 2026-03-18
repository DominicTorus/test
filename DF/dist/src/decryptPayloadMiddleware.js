"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const DecryptPayloadMiddleware = (commonService) => {
    const plugin = async (fastify) => {
        fastify.addHook('preHandler', async (req, res) => {
            if (!req.body) {
                return;
            }
            const { dpdKey, method, ciphertext } = req.body;
            console.log("dpdKey", dpdKey);
            console.log("method", method);
            if (ciphertext) {
                try {
                    let decryptedData = await commonService.commondecryption(dpdKey, method, req.body, 'ct003_rd001_rds001_v2');
                    decryptedData = decryptedData.replace(/[\x00-\x1F\x7F]+/g, '').trim();
                    const parsedData = JSON.parse(decryptedData);
                    req.body = {
                        ...parsedData,
                        dpdKey,
                        method,
                    };
                }
                catch (error) {
                    console.error("Decryption or JSON parse failed:", error);
                    res.code(400).send({ message: "Invalid payload" });
                }
            }
        });
    };
    return (0, fastify_plugin_1.default)(plugin);
};
exports.default = DecryptPayloadMiddleware;
//# sourceMappingURL=decryptPayloadMiddleware.js.map