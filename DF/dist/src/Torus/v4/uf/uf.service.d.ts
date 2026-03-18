import { CommonService } from 'src/common.Service';
import { RedisService } from 'src/redisService';
import { JwtService } from '@nestjs/jwt';
import { JwtServices } from 'src/jwt.services';
import { RuleService } from 'src/ruleService';
import { MongoService } from 'src/mongoService';
export declare class UfService {
    private readonly jwtService;
    private readonly jwt;
    private readonly gorule;
    private readonly redisService;
    private readonly commonService;
    private readonly mongoService;
    constructor(jwtService: JwtServices, jwt: JwtService, gorule: RuleService, redisService: RedisService, commonService: CommonService, mongoService: MongoService);
    screenRoute(keys: any[], token: string, header: any): Promise<any>;
    uploadFile(file: {
        buffer: Buffer;
        filename: string;
        mimetype: string;
        size: number;
    }, context: string, enableEncryption: string): Promise<any>;
    getFile(id: string, context: string, enableEncryption: Boolean): Promise<{
        res: Buffer<ArrayBufferLike>;
        file: import("mongodb").GridFSFile;
    }>;
    setUpKey(key: string, token: string): Promise<any>;
    readMDK(readMDdto: any): Promise<any>;
    getFormat(finalArr: any, input: any): Promise<any>;
    getpagination(key: any, page: any, count: any, filter?: any, searchObj?: any, token?: string): Promise<{
        records: any[];
        totalRecords: any;
    }>;
    filterpagination(start: any, end: any, searcharr: any): Promise<{
        records: any[];
        totalRecords: any;
    }>;
    Orchestration(key: string, componentId: string, controlId: string, token: string, isTable?: boolean, accessProfile?: any[]): Promise<any>;
    elementsFilter(key: string, groupName?: any, controlName?: string, token?: string): Promise<any>;
    getMapperDetails(key: string, componentId: string, controlId: string, category: string, bindtranValue?: any, code?: any, token?: string): Promise<any>;
    codeExecution(stringCode: string, params: any): Promise<any>;
    eventFunction(eventProperty: any): Promise<any>;
    codefilter(key: string, groupId?: any, controlId?: string, event?: any, token?: string): Promise<any>;
    ifo(formData: any, key: string, controlId: string, isTable?: Boolean, token?: string): Promise<any>;
    fetchActionDetails(key: string, groupId: string, controlName: string, token: string): Promise<{
        lockDetails: any;
        paginationDetails: any;
    }>;
    fetchRuleDetails(key: string, groupId: string, controlId: string, token: string): Promise<any>;
    InitiatePF(key: string, sourceId: string, token: string): Promise<{
        nodeProperty: any;
        eventProperty: any;
    }>;
    getPFDetails(isTable: Boolean, key: string, groupId: string, controlId: string, token: string): Promise<{
        key: any;
        url: any;
        primaryKey: any;
        tableName?: undefined;
        status?: undefined;
    } | {
        url: any;
        primaryKey: any;
        key?: undefined;
        tableName?: undefined;
        status?: undefined;
    } | {
        key: any;
        primaryKey: any;
        tableName: any;
        status: any;
        url?: undefined;
    } | {
        primaryKey: any;
        tableName: any;
        status: any;
        key?: undefined;
        url?: undefined;
    }>;
    getDfkey(ufKey: any, groupid?: string, token?: string): Promise<string | string[]>;
    paginationDataFilter(ufKey: any, data: any, token: string, dfdType: string, primaryKey: string): Promise<any>;
    setSaveHandlerData(key: any, value: any, path: any): Promise<void>;
    uploadHandlerData(key: any): Promise<void>;
    SFCheckScreen(ufKey: string, token: string, nodeId?: string, isTable?: boolean): Promise<any>;
    logout(headers: any, tokens: string, key: string): Promise<string>;
    getAccessToken(token: string, selectedCombination: any, selectedAccessProfile: string, dap: string | undefined, ufClientType: string): Promise<string>;
    transformToCombinations(data: any[]): {
        accessProfile: any;
        dap: any;
        combinations: any[];
        orgGrp: any;
    }[];
    getAccessTemplate(token: string): Promise<{
        accessProfile: any;
        dap: any;
        combinations: any[];
        orgGrp: any;
    }[]>;
    fusionAuthVerifyRefreshToken(refreshToken: string): Promise<any>;
    toMinutes(value: any): number;
    checkSession(sessionList: any[]): Promise<any[]>;
    MyAccountForClient(token: string, key: string, authorization: any): Promise<any>;
    introspectToken(headers: any, key: string, tokens: string): Promise<{
        authenticated: boolean;
        updatedToken: any;
    }>;
    isUserAccessExpired(user: {
        accessExpires?: string | Date | null;
        accessProfile?: string[];
    }): boolean;
    signIntoTorus(username: string, password: string, ufClientType: string, isOauthUser?: boolean, fusionAuthLoginResponse?: any | undefined): Promise<false | {
        token: string;
        authorized: boolean;
        email: any;
        redirectToORPSelector: boolean;
    }>;
    signInViaIAM(username: string, password: string, ufClientType: string, isOauthUser?: boolean): Promise<false | {
        token: string;
        authorized: boolean;
        email: any;
        redirectToORPSelector: boolean;
    }>;
    addSession(sessionObj: any, sessionListCacheKey: string): Promise<boolean>;
    comparePasswords(password: string, storedHash: string): boolean;
    throwCustomException(error: any): Promise<void>;
    hashPassword(password: string): string;
    getTenantUser(tenantCode: string, client: string): Promise<any>;
    getAppUserList(tenant: string, ag: string, app: string, client: string): Promise<any>;
    getTenantAppUser(tenant: any, client: any, ag: any, app: any): Promise<any[]>;
    getAppSecurityData(): Promise<{}>;
    getAPPSecurityTemplateData(): Promise<any[]>;
    getAppAccessProfiles(): Promise<{}>;
    postAppUserList(data: any): Promise<string>;
    setJson(key: string, data: any): Promise<string>;
    appUserAddition(data: any, isFusionAuth?: boolean): Promise<any[]>;
    getDFS(fileUrl: string, enableEncryption: boolean): Promise<Buffer>;
    uploadImage(file: Express.Multer.File, bucketFoldername?: string, folderPath?: string, filename?: string, enableEncryption?: string): Promise<string>;
    readAMDKey(key: string, token: string): Promise<any>;
    getResetPasswordOtp(email: string): Promise<string>;
    verifyOtp(email: string, otp: string): Promise<boolean>;
    resetPassword(email: string, password: string): Promise<string>;
    handleFusionResetPassWord(fusionAuthTenantId: string, password: string, uniqueId: string): Promise<{
        status: number;
        data: any;
        error?: undefined;
    } | {
        error: any;
        status: number;
        data?: undefined;
    }>;
    sendMailOTP(email: string): Promise<{
        otp: number;
        message: string;
    }>;
    getEndPoints(input: any): Promise<any[]>;
    createApiCollection(input: any, collectionName: any): Promise<{
        status: string;
        message: string;
    }>;
    replaceRefs(schema: any): Promise<any>;
    getModel(data: any, requestParameter: any, nestedModelArr: any, contentType: any): Promise<{
        [requestParameter]: {};
    }>;
    getReferenceModel(data: any, requestParameter: any, ReferenceResponseDto: any, contentType: any): Promise<any>;
    getResponseModel(data: any, pathParameter: any, responseParameter: any, nestedModelArr: any, contentType: any): Promise<{
        [responseParameter]: {};
    }>;
    getReferenceResponseModel(data: any, pathParameter: any, responseParameter: any, ResponseDto: any, contentType: any): Promise<any>;
    notifyUserAccessPending(oauthUser: any, userList: any[]): Promise<boolean>;
    oauthSignIn(user: any): Promise<false | {
        token: string;
        authorized: boolean;
        email: any;
        redirectToORPSelector: boolean;
    }>;
    AppSecurityTemplateData(data: any[]): Promise<string>;
    screenDetailsData(data: any): Promise<any[]>;
    getAccessProfileForArtifact(key: string, clientCode: string, token: string): Promise<any>;
    navbarDataPreparation(data: any, clientCode: string, token: string): Promise<any[]>;
    getNavbarData(key: string, clientCode: string, token: string): Promise<any[]>;
    postTenantUser(userDetail: any): Promise<void>;
}
