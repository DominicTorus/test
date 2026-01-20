import { orders } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { order_itemsEntity } from '../../order_items/entity/order_items.entity';



export class  ordersEntity implements  orders {
    @ApiProperty({example:"number"})
    id:number;
    @ApiProperty({example:"string"})
    order_no:string;
    @ApiProperty({example:"number"})
    customer_id:number;
    @Transform(({ value }) => value?.toISOString().split('T')[0])
    @ApiProperty({example:"date"})
    order_date:Date;
    @ApiProperty({example:"number"})
    total_amount:number;
    @ApiProperty({example:"string"})
    notes:string;
    @ApiProperty({example:"boolean"})
    is_active:boolean;
    @ApiProperty({example:"number"})
    v_no:number;
    @ApiProperty({ type: [order_itemsEntity], required: false})
    order_items?: order_itemsEntity[];
    @ApiProperty({example:"string"})
    trs_creator_email: string;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    trs_created_date: Date;
    @ApiProperty({example:"string"})
    trs_created_by: string;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    trs_modified_date: Date;
    @ApiProperty({example:"string"})
    trs_modified_by: string;
    @ApiProperty({example:"string"})
    trs_status: string;
    @ApiProperty({example:"string"})
    trs_next_status: string;
    @ApiProperty({example:"string"})
    trs_process_id: string;
    @ApiProperty({example:"string"})
    trs_access_profile: string;
    @ApiProperty({example:"string"})
    trs_org_grp_code: string;
    @ApiProperty({example:"string"})
    trs_org_code: string;
    @ApiProperty({example:"string"})
    trs_role_grp_code: string;
    @ApiProperty({example:"string"})
    trs_role_code: string;
    @ApiProperty({example:"string"})
    trs_ps_grp_code: string;
    @ApiProperty({example:"string"})
    trs_ps_code: string;
    @ApiProperty({example:"string"})
    trs_sub_org_code: string;
    @ApiProperty({example:"string"})
    trs_sub_org_grp_code: string;
}
      
export class  orders_OnlyParentEntity {
    @ApiProperty({example:"number"})
    id:number;
    @ApiProperty({example:"string"})
    order_no:string;
    @ApiProperty({example:"number"})
    customer_id:number;
    @Transform(({ value }) => value?.toISOString().split('T')[0])
    @ApiProperty({example:"date"})
    order_date:Date;
    @ApiProperty({example:"number"})
    total_amount:number;
    @ApiProperty({example:"string"})
    notes:string;
    @ApiProperty({example:"boolean"})
    is_active:boolean;
    @ApiProperty({example:"number"})
    v_no:number;
    @ApiProperty({example:"string"})
    trs_creator_email: string;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    trs_created_date: Date;
    @ApiProperty({example:"string"})
    trs_created_by: string;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    trs_modified_date: Date;
    @ApiProperty({example:"string"})
    trs_modified_by: string;
    @ApiProperty({example:"string"})
    trs_status: string;
    @ApiProperty({example:"string"})
    trs_next_status: string;
    @ApiProperty({example:"string"})
    trs_process_id: string;
    @ApiProperty({example:"string"})
    trs_access_profile: string;
    @ApiProperty({example:"string"})
    trs_org_grp_code: string;
    @ApiProperty({example:"string"})
    trs_org_code: string;
    @ApiProperty({example:"string"})
    trs_role_grp_code: string;
    @ApiProperty({example:"string"})
    trs_role_code: string;
    @ApiProperty({example:"string"})
    trs_ps_grp_code: string;
    @ApiProperty({example:"string"})
    trs_ps_code: string;
    @ApiProperty({example:"string"})
    trs_sub_org_code: string;
    @ApiProperty({example:"string"})
    trs_sub_org_grp_code: string;
}


export { orders };