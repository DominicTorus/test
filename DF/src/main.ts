
/* {
  "aKey": "CK:TGA:FNGK:BLDC:FNK:DEV:CATK:CT003:AFGK:CG:AFK:TG1:AFVK:v10:bldc",
  "deploymentArtifactKey": "CK:CT003:FNGK:AF:FNK:CDF-DPD:CATK:CG:AFGK:TG1:AFK:UpPostgres:AFVK:v1",
  "appGroupDesc": "CG",
  "logType": "mongodb",
  "appDesc": "TG1",
  "appLogo": "https://cdns3dfsdev.toruslowcode.com/torus/9.1/CT003/resources/images/ChatGPT Image Apr 4, 2025, 11_51_19 AM.png",
  "isOld": true,
  "clientCode": "CT300",
  "loginDetails": {
    "loginId": "john",
    "firstName": "Peruaml",
    "lastName": "P",
    "email": "perumalp@torus.tech",
    "mobile": "2356895623",
    "2FAFlag": "N",
    "scope": "client_admin",
    "status": "active",
    "accessProfile": [
      "admin"
    ],
    "accessExpires": "2027-01-09",
    "dateAdded": "2025-11-28T04:42:16.447Z",
    "isRestricted": false,
    "userUniqueId": "7be843be-7d02-4dd3-80f3-083b5afb2ddc",
    "touring": {
      "isneedTouring": true,
      "touringData": {
        "/control-center/storage-configuration": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/control-center/tenant": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/torus": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/control-center/company-profile": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/control-center/user-roles": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "build": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/control-center/user-management": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/control-center/account-profile": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/control-center/appearance": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/control-center/notifications": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/logs_hub": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "artifactselector": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/logic-center": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "Security": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/tenant-settings": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "logs": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        }
      }
    },
    "lastActive": "2026-01-13T04:48:21.025Z",
    "client": "CT300",
    "users": "johnPeruaml P",
    "profile": "",
    "edit": ""
  }
} */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import authPlugin from './auth.middleware';
import { CommonService } from './common.Service';
import * as fs from 'fs';
import DecryptPayloadMiddleware from './decryptPayloadMiddleware';
import multipart from '@fastify/multipart';
import { BigIntInterceptor } from './bigint.interceptor';


async function bootstrap() {
    const fastifyAdapter = new FastifyAdapter({
    bodyLimit: 500 * 1024 * 1024, // 500MB limit
    logger: true,
  });
  
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );
    // Global interceptor for BigInt serialization
  app.useGlobalInterceptors(new BigIntInterceptor());
  //app.use(
    //session({
      //secret: 'Torus9x',
      //resave: false,
      //saveUninitialized: false,
    //}),
  //);
  
  //Middleware applied
  const fastifyInstance = fastifyAdapter.getInstance();
  const commonService = app.get(CommonService);
  //await fastifyInstance.register(authPlugin(commonService), { prefix: '/te' });
  await fastifyInstance.register(DecryptPayloadMiddleware(commonService));
   // Register the core Fastify multipart plugin
  fastifyInstance.register(multipart as any);    
  //CORS
  app.enableCors({methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']});

  // Microservice setup (TCP transport)
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: process.env.PO_PORT,
    },
  });
  await app.startAllMicroservices();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('The Nestjs API documentation')
    .setVersion('0.10')
    .addTag('ERD API')
    .addTag('Torus API')
    .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 
    'JWT-auth',
    )
    .addServer('http://192.168.2.57:3010','Production Server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('docs', app, document);

  //helmet
  await app.register(helmet,{
  contentSecurityPolicy: false,
  global: true, 
  });

  // Start Fastify app
  await app.listen(process.env.APP_PORT,"0.0.0.0");
}
bootstrap();
