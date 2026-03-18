import { userService } from './user.service';
import { Prisma } from '@prisma/client';
import { userEntity } from './entity/user.entity';
import { UfService } from 'src/Torus/v2/uf/uf.service';
export declare class userController {
    private readonly userService;
    private readonly ufservice;
    constructor(userService: userService, ufservice: UfService);
    findSchema(authHeader: string, req: any): Promise<{
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
    findAllmethod(authHeader: string, query: any, body: any, req: any): Promise<any>;
    findOne(authHeader: string, user_id: number, req: any): Promise<userEntity>;
    findAll(authHeader: string, req: any, trs_created_date?: Date, trs_created_by?: string, trs_modified_date?: Date, trs_modified_by?: string, trs_next_status?: string, trs_status?: string, trs_process_id?: string, trs_access_profile?: string, trs_org_grp_code?: string, trs_org_code?: string, trs_role_grp_code?: string, trs_role_code?: string, trs_ps_grp_code?: string, trs_ps_code?: string, trs_sub_org_grp_code?: string, trs_sub_org_code?: string, user_id?: string, query?: Record<string, any>): Promise<userEntity>;
    create(mcRole: string, mcUsername: string, mcRemarks: string, mcApprovalStatus: string, mcApprovalID: string, authHeader: string, createuserDto: Prisma.userCreateInput, req: any): Promise<userEntity | {
        success: boolean;
        message: string;
        approval_id: any;
        status: string;
    }>;
    update(mcRole: string, mcUsername: string, mcRemarks: string, mcApprovalStatus: string, authHeader: string, user_id: number, updateuserDto: Prisma.userUpdateInput, req: any): Promise<userEntity | {
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
    remove(mcRole: string, mcUsername: string, mcRemarks: string, mcApprovalStatus: string, authHeader: string, user_id: number, req: any): Promise<userEntity | {
        success: boolean;
        message: string;
        approval_id: any;
        record_id: number;
        status: string;
    }>;
    findFirst(authHeader: string, params: any, req: any): Promise<userEntity>;
    findLast(authHeader: string, params: any, req: any): Promise<userEntity>;
}
