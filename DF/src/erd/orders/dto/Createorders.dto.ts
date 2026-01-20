import { Prisma } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { order_itemsEntity} from 'src/erd/order_items/entity/order_items.entity';


export class  CreateordersDto {
        @ApiProperty()
        order_no?: string;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        customer_id?: number;
        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        order_date?: Date;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        total_amount?: number;
        @ApiProperty()
        notes?: string;
        @ApiProperty()
        is_active?: boolean;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        v_no?: number;
        @ApiProperty({ type: [order_itemsEntity], required: false})
        order_items?: order_itemsEntity[];
        @ApiProperty()
        trs_creator_email?: string;
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
        trs_status?: string;
        @ApiProperty()
        trs_next_status?: string;
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
        trs_sub_org_grp_code?: string;
        @ApiProperty()
        trs_sub_org_code?: string;
}

