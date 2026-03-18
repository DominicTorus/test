"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const helmet_1 = require("@fastify/helmet");
const common_Service_1 = require("./common.Service");
const fs = require("fs");
const decryptPayloadMiddleware_1 = require("./decryptPayloadMiddleware");
const multipart_1 = require("@fastify/multipart");
const bigint_interceptor_1 = require("./bigint.interceptor");
async function bootstrap() {
    const fastifyAdapter = new platform_fastify_1.FastifyAdapter({
        bodyLimit: 500 * 1024 * 1024,
        logger: true,
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, fastifyAdapter);
    app.useGlobalInterceptors(new bigint_interceptor_1.BigIntInterceptor());
    const fastifyInstance = fastifyAdapter.getInstance();
    const commonService = app.get(common_Service_1.CommonService);
    await fastifyInstance.register((0, decryptPayloadMiddleware_1.default)(commonService));
    fastifyInstance.register(multipart_1.default);
    app.enableCors({ methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'] });
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            port: process.env.PO_PORT,
        },
    });
    await app.startAllMicroservices();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nest API')
        .setDescription('The Nestjs API documentation')
        .setVersion('0.2')
        .addTag('ERD API')
        .addTag('Torus API')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-auth')
        .addServer('https://tgadev.toruslowcode.com/ct003/rd001/rds001/v1/api', 'Production Server')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.register(helmet_1.default, {
        contentSecurityPolicy: false,
        global: true,
    });
    await app.listen(process.env.APP_PORT, "0.0.0.0");
}
bootstrap();
//# sourceMappingURL=main.js.map