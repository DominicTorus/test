import { Prisma } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { product_OnlyParentEntity} from 'src/erd/product/entity/product.entity';          


export class  UpdateuserDto {
        @ApiProperty()
        name?: string;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        product_id?: number;
        @ApiProperty()
        phone?: string;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        age?: number;

        @ApiProperty({ type: [product_OnlyParentEntity], required: false})
        product?: product_OnlyParentEntity[];               

        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        trs_created_date?: Date;
        @ApiProperty()
        trs_created_by?: string;
        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        trs_modified_date?: Date;
        @ApiProperty()
        trs_modified_by?: string;
        @ApiProperty()
        trs_process_id?: string;
        @ApiProperty()
        trs_access_profile?: string;
        @ApiProperty()
        trs_org_grp_code?: string;
        @ApiProperty()
        trs_org_code?: string;
        @ApiProperty()
        trs_role_grp_code?: string;
        @ApiProperty()
        trs_role_code?: string;
        @ApiProperty()
        trs_ps_grp_code?: string;
        @ApiProperty()
        trs_ps_code?: string;
        @ApiProperty()
        trs_sub_org_code?: string;
        @ApiProperty()
        trs_sub_org_grp_code?: string;
        @ApiProperty()
        trs_locked_by?: string;
        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        trs_locked_time?:  Date;
        @ApiProperty()
        trs_tenant_id?: string;      
        @ApiProperty()
        trs_app_code?: string;      
        @ApiProperty()
        trs_product_code?: string;      
        @ApiProperty()
        trs_event_process_status?: string;      
        @ApiProperty()
        trs_event_status?: string;

}

