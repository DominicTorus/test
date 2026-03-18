import { FastifyPluginAsync } from 'fastify';
import { CommonService } from './common.Service';
declare const authPlugin: (commonService: CommonService) => FastifyPluginAsync;
export default authPlugin;
