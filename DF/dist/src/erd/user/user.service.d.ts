import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CommonService } from 'src/common.Service';
export declare class userService {
    private readonly prismaService;
    private readonly commonService;
    constructor(prismaService: PrismaService, commonService: CommonService);
    private encryptedCols;
    encryptData(data: any, tableName: string, method: any): Promise<any>;
    decryptData(data: any, tableName: string): Promise<any>;
    findSchema(token: any): Promise<{
        user_id: string;
        name: string;
        email: string;
        designation: string;
        trs_created_date: string;
        trs_created_by: string;
        trs_modified_date: string;
        trs_modified_by: string;
        trs_next_status: string;
        trs_status: string;
        trs_process_id: string;
        trs_access_profile: string;
        trs_org_grp_code: string;
        trs_org_code: string;
        trs_role_grp_code: string;
        trs_role_code: string;
        trs_ps_grp_code: string;
        trs_ps_code: string;
        trs_sub_org_grp_code: string;
        trs_sub_org_code: string;
    }>;
    findAllmethod(queryDto: any, limit: number, selectColumns: any, token: any): Promise<any>;
    findOne(user_id: number, token: string): Promise<any>;
    findAll(token: string, trs_created_date?: Date, trs_created_by?: string, trs_modified_date?: Date, trs_modified_by?: string, trs_next_status?: string, trs_status?: string, trs_process_id?: string, trs_access_profile?: string, trs_org_grp_code?: string, trs_org_code?: string, trs_role_grp_code?: string, trs_role_code?: string, trs_ps_grp_code?: string, trs_ps_code?: string, trs_sub_org_grp_code?: string, trs_sub_org_code?: string, user_id?: number): Promise<any>;
    create(createuserDto: Prisma.userCreateInput, token: string): Promise<any>;
    createMaster(createuserDto: Prisma.userCreateInput, userInfo: {
        role: string;
        username: string;
        remarks?: string;
        approvalStatus?: string;
        approvalId?: string;
    }, token: string): Promise<{
        success: boolean;
        message: string;
        approval_id: any;
        status: string;
    }>;
    update(user_id: number, updateuserDto: Prisma.userUpdateInput, token: string): Promise<any>;
    updateMaster(user_id: number, updateuserDto: Prisma.userUpdateInput, userInfo: {
        role: string;
        username: string;
        remarks?: string;
        approvalStatus?: string;
    }, token: string): Promise<{
        success: boolean;
        message: string;
        approvalId: any;
        record_id: number;
        status: string;
        approval_id?: undefined;
    } | {
        success: boolean;
        message: string;
        approval_id: any;
        record_id: number;
        status: string;
        approvalId?: undefined;
    }>;
    remove(user_id: number, token: string): Promise<{
        name: string;
        trs_next_status: string;
        trs_status: string;
        trs_process_id: string;
        trs_access_profile: string;
        trs_org_grp_code: string;
        trs_org_code: string;
        trs_role_grp_code: string;
        trs_role_code: string;
        trs_ps_grp_code: string;
        trs_ps_code: string;
        email: string;
        trs_created_by: string;
        trs_sub_org_grp_code: string;
        trs_sub_org_code: string;
        trs_modified_by: string;
        user_id: number;
        designation: string;
        trs_created_date: Date;
        trs_modified_date: Date;
    }>;
    deleteMaster(user_id: number, userInfo: {
        role: string;
        username: string;
        remarks?: string;
        approvalStatus?: string;
    }, token: string): Promise<{
        success: boolean;
        message: string;
        approval_id: any;
        record_id: number;
        status: string;
    }>;
    findFirst(token: string): Promise<any>;
    findLast(token: string): Promise<any>;
}
