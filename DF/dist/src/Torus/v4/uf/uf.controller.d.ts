import { UfService } from './uf.service';
import { codefilterDto, getMapperDetailsDto, ifoDto, InitiatePFDto, OrchestrationDto, pageDto, dataGet, paginationDataFilterDto, setUpKeyDto, signinToTorusDto, logoutDto } from 'src/dto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Response } from 'express';
export declare class UfController {
    private readonly appService;
    constructor(appService: UfService);
    screenRoute(keys: any, header: any): Promise<any>;
    getAccessToken(body: any, req: any): Promise<any>;
    getAccessTemplates(req: any, query: any): Promise<any>;
    uploadFile(req: FastifyRequest): Promise<any>;
    getFile(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    setUpKey(body: setUpKeyDto, req: any): Promise<any>;
    Orchestration(body: OrchestrationDto, req: any): Promise<any>;
    sendMailOTP(input: any, req: any): Promise<any>;
    getMapperDetails(body: getMapperDetailsDto, req: any): Promise<any>;
    codefilter(body: codefilterDto, req: any): Promise<any>;
    getDfkey(ufKey: string, groupId: string, req: any): Promise<string | string[]>;
    paginationDataFilter(body: paginationDataFilterDto, req: any): Promise<any>;
    InitiatePF(body: InitiatePFDto, req: any): Promise<any>;
    ifo(body: ifoDto, req: any): Promise<any>;
    signinToTorus(body: signinToTorusDto, req: any): Promise<any>;
    MyAccountForClient(req: Request, query: any): Promise<any>;
    logout(header: any, body: logoutDto, query: any): Promise<any>;
    introspectToken(header: any, query: any): Promise<any>;
    getpagination(input: pageDto, req: any): Promise<any>;
    dataGet(input: dataGet, req: any): Promise<any>;
    getAppSecurityData(): Promise<{}>;
    getAPPSecurityTemplateData(): Promise<any[]>;
    getAppAccessProfiles(): Promise<{}>;
    postAppUserList(body: any): Promise<string>;
    appSecurityTemplateData(body: any): Promise<string>;
    setJson(query: any, body: any): Promise<any>;
    getDFS(body: any, res: FastifyReply): Promise<void>;
    post_upload(req: FastifyRequest): Promise<{
        imageUrl: string;
    }>;
    readAMDKey(key: string, req: any): Promise<any>;
    getResetPasswordOtp(query: any): Promise<string>;
    verifyOtp(query: any): Promise<boolean>;
    resetPassword(body: any): Promise<string>;
    oauthSignIn(body: any): Promise<false | {
        token: string;
        authorized: boolean;
        email: any;
        redirectToORPSelector: boolean;
    }>;
    getNavbarData(body: any, req: any): Promise<any[]>;
}
