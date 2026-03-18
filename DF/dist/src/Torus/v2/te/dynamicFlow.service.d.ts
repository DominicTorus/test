import { PoEvent } from "src/dto";
import { RedisService } from "src/redisService";
import { CommonService } from "src/common.Service";
import { JwtService } from "@nestjs/jwt";
import { LockService } from "src/lock.service";
import { AxiosRequestConfig } from "axios";
import { EventEmitterProcessor } from "./event-emitter.processor";
import { ListenerService } from "./listener.service";
export declare class DynamicFlowService {
    private readonly redisService;
    private readonly listenerService;
    private readonly jwtService;
    private readonly CommonService;
    private readonly lockservice;
    private readonly processor;
    private ajv;
    private statickeyword;
    private numberArr;
    constructor(redisService: RedisService, listenerService: ListenerService, jwtService: JwtService, CommonService: CommonService, lockservice: LockService, processor: EventEmitterProcessor);
    private readonly logger;
    DynamicFlowProcess(input: PoEvent): Promise<any>;
    pfProcessor(pfdto: any, event: any, pfjson: any, poJson: any, pfo: any, ndp: any, currentFabric: any, flag: any, page: any, count: any, filterData: any, lockDetails: any, childtable: any, logicCenter: any): Promise<"Another update is in progress. Please try again later." | {
        status: number;
        targetStatus: any;
        data: any;
    } | {
        data: string;
        status?: undefined;
        targetStatus?: undefined;
    } | {
        status: number;
        targetStatus: any;
        data?: undefined;
    } | {
        status: any;
        targetStatus: any;
        data: {};
    }>;
    sessionDecode(token: any, upId: any): Promise<{
        sobj: {};
        SessionInfo: {};
        SessionToken: any;
    }>;
    assign(apiResult: any, ifoObj: any, codeObj: any, inputparam: any, nodeName: any, mapObj: any): Promise<{
        apichildResult: any;
        inputparam: any;
    }>;
    codeORifoAndInputparamAssign(customcoderesult: any, apires: any): Promise<any>;
    ifoAssign(internalMappingNodes: any, nodeId: any): {};
    codeAssign(data: any): any;
    assignToInputParam(inputparam: any, nodeName: string, data: any): Promise<any>;
    executeApiCall(methodName: string, apiUrl: string, requestConfig: AxiosRequestConfig, body?: any): Promise<any>;
    exceptionhandler(failureQueue: any, suspiciousQueue: any, errorQueue: any, error: any, upId: any, nodeId: any, failureTargetStatus: any, inputparam: any): Promise<void>;
    convertToKeyValue(data: string[]): Record<string, any>[];
    parseCsv(csvString: string): Promise<any[]>;
    parseXlsx(xlsxString: any): Promise<any[]>;
    flattenJson(data: any): Promise<any[]>;
    private flattenObject;
    keysToLowerCaseOnly(obj: any): any;
    transformData(edges: any, dataSets: any, methodName?: any): Promise<any>;
    consolidateArrayMappings(mapping: Record<string, string | {
        sourcePath: string;
        arrayMap: Record<string, string>;
    }>): Promise<Record<string, any>>;
    createMappingConfig(edges: any, dataSets: any): Promise<{}>;
    mergingDataSet(dataSets: any): Promise<any[]>;
    removeNestedArrays(obj: any): any;
    processJson(data: any): any;
    findCommonRoot(paths: string[]): Promise<any>;
    reorderTargetPaths(edges: any, schema: any): Promise<any>;
    validateType(singleObj: any, model: any, errdata: any, token: any, ApiKey: any): Promise<any>;
    extractPathsFromSchema(schemaNode: any, currentPath: string, collectedPaths: string[]): Promise<void>;
    APItransformData(edges: any, dataSets: any): Promise<any>;
    APIcreateMappingConfig(edges: Record<string, string[]>, dataSet: any[]): Promise<Record<string, any>>;
    recursiveFilter(query: any, orderdata: any[]): Promise<any[]>;
    toLowerCaseKeys(obj: any): any;
    extractDataWithArrayExpansion(data: any, targetPaths: string[]): any;
    getNestedValue(obj: any, path: string): any;
    setNestedValue(obj: any, path: string, value: any): void;
    DFDMapEdgeValues(poNode: any[], currentNodeEdge: any, inputparam: any, processedKey: string, upId: string, collectionName: string, parameter: any, codeObj: any, pfo: any, fabric: any): Promise<{
        mapObj: {};
        tempQryVal: any[];
    }>;
    mapEdgeValuesToParams(pfdto: any, currentNodeEdge: any, inputparam: any, processedKey: string, upId: string, collectionName: string, parameter: any, codeObj: any, pfo: any, childtable?: any): Promise<any>;
    combineData(innerpathVal: any, tempArr: any): Promise<any>;
    getCombinations(srcIdArr: any, nodesArr: any): Promise<any>;
    buildRequestComponents(apiUrl: string, tempQryVal: any[], mapObj: Record<string, any>): Promise<any>;
    filterApiResponse(apires: any, filterParams: any[]): Promise<any>;
    paginateResult(data: any[], page: number, count: number): Promise<any>;
    generateMockData(schema: any): any;
    getMockValue(type: string): any;
    findMatchingValuesFlexible(jsonData: any, path: string, expectedValue: any): any[];
    transformBySchema(schema: any, data: any): any;
}
