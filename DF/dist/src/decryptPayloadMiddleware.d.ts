import { CommonService } from "./common.Service";
import { FastifyPluginAsync } from 'fastify';
declare const DecryptPayloadMiddleware: (commonService: CommonService) => FastifyPluginAsync;
export default DecryptPayloadMiddleware;
