import { Request } from 'express';
export declare const FILE_UPLOADS_DIR: string;
export declare const fileNameEditor: (req: Request, file: any, callback: (error: any, filename: any) => void) => void;
export declare const imageFileFilter: (req: Request, file: any, callback: (error: any, valid: boolean) => void) => void;
export declare class ReadMDdto {
    SOURCE: string;
    TARGET: string;
    CK: any;
    FNGK: any;
    FNK: any;
    CATK?: String[];
    AFGK?: String[];
    AFK?: String[];
    AFVK?: String[];
    AFSK?: String;
}
export declare class readAPIDTO {
    SOURCE: string;
    TARGET: string;
    CK: string;
    FNGK: string;
    FNK: string;
    CATK: string[];
    AFGK: string[];
    AFK: string[];
    AFVK: string[];
    AFSK: string;
}
export declare class uploadHandlerDto {
    key: string;
}
export declare class saveHandlerDto {
    key: string;
    value: any;
    path: string;
}
export declare class securityDto {
    key: string;
    nodeName?: string;
    isTable?: boolean;
}
export declare class PoEvent {
    pfdto: pfDto;
    event: string;
    pfs: any;
    poJson: any;
    pfo: any;
    ndp: any;
    flag: string;
    page?: number;
    count?: number;
    filterData?: object;
    lock?: Object;
    childTable?: any;
    logicCenter?: boolean;
    schedulerStatus?: string;
    constructor(pfdto: pfDto, event: string, pfs: any, poJson: any, pfo: any, ndp: any, flag: string, page?: number, count?: number, filterData?: object, lock?: Object, childTable?: any, logicCenter?: boolean, schedulerStatus?: string);
}
export declare class pfDto {
    key: string;
    upId: any;
    event: string;
    data: any;
    token: string;
    nodeId: string;
    nodeName: string;
    nodeType: string;
    sourceId: string;
    refreshFlag: string;
    dpdKey?: string;
    method?: string;
    page?: number;
    count?: number;
    filterData?: object;
    lock?: Object;
    childTable?: any;
    logicCenter?: boolean;
    schedulerStatus?: string;
    parentUpId?: string;
}
export declare class pageDto {
    key: string;
    page: number;
    count: number;
    filterDetails?: object;
    searchFilter?: object;
    dpdKey?: string;
    method?: string;
}
export declare class dataGet {
    key: string;
    filterDetails?: object;
    searchFilter?: object;
    dpdKey?: string;
    method?: string;
}
export interface errorObj {
    tname: string;
    errGrp: string;
    fabric: string;
    errType: string;
    errCode: string;
}
export declare class setUpKeyDto {
    key: string;
    dpdKey?: string;
    method?: string;
}
export declare class uploadFileDto {
    file: any;
    key: string;
    bucketFolderame: string;
    folderPath: string;
}
export declare class uploadFileMobileDto {
    file: any;
    key: string;
    bucketFolderame: string;
    folderPath: string;
}
export declare class OrchestrationDto {
    key: string;
    componentId?: string;
    controlId?: string;
    isTable: boolean;
    accessProfile?: any[];
    dpdKey?: string;
    method?: string;
}
export declare class getPresignedUrlDto {
    key: string;
}
export declare class elementsFilterDto {
    key: string;
    group?: string;
    control?: string;
}
export declare class getMapperDetailsDto {
    ufkey: string;
    componentId: string;
    category: string;
    controlId: string;
    bindtranValue?: any;
    code?: any;
    dpdKey?: string;
    method?: string;
}
export declare class codeExecutionDto {
    stringCode: string;
    params: string;
}
export declare class codefilterDto {
    key: string;
    groupId?: any;
    controlId?: string;
    event?: any;
    dpdKey?: string;
    method?: string;
}
export declare class paginationDataFilterDto {
    key: string;
    dfdType?: string;
    data?: any;
    dpdKey?: string;
    method?: string;
    primaryKey?: string;
}
export declare class InitiatePFDto {
    key: string;
    sourceId: any;
    dpdKey?: string;
    method?: string;
}
export declare class fetchActionDetailsDto {
    key: string;
    groupId: string;
    controlId: string;
}
export declare class fetchRuleDetailsDto {
    key: string;
    groupId: string;
    controlId: string;
}
export declare class ifoDto {
    formData: any;
    key: string;
    controlId: string;
    isTable?: boolean;
    dpdKey?: string;
    method?: string;
}
export declare class logoutDto {
    key: string;
    dpdKey?: string;
    method?: string;
}
export declare class myAccountForClientdto {
    key: string;
    dpdKey?: string;
    method?: string;
}
export declare class introspectDto {
    key: string;
    dpdKey?: string;
    method?: string;
}
export declare class signinToTorusDto {
    client: string;
    username: string;
    password: string;
    type: 't' | 'c';
    dpdKey?: string;
    method?: string;
    ufClientType?: string;
}
export interface errorObj {
    tname: string;
    errGrp: string;
    fabric: string;
    errType: string;
    errCode: string;
}
