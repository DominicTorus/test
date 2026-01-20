import { order_items } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  order_itemsEntity implements  order_items {
    @ApiProperty({example:"number"})
    order_id:number;
    @ApiProperty({example:"bigint"})
    product_id:bigint;
    @ApiProperty({example:"string"})
    product_name:string;
    @ApiProperty({example:"number"})
    quantity:number;
    @ApiProperty({example:"number"})
    unit_price:number;
    @ApiProperty({example:"number"})
    line_total:number;
    @ApiProperty({example:"boolean"})
    is_active:boolean;
    @ApiProperty({example:"number"})
    v_no:number;
    @ApiProperty()
    id: number;
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
      
export class  order_items_OnlyParentEntity {
    @ApiProperty({example:"number"})
    order_id:number;
    @ApiProperty({example:"bigint"})
    product_id:bigint;
    @ApiProperty({example:"string"})
    product_name:string;
    @ApiProperty({example:"number"})
    quantity:number;
    @ApiProperty({example:"number"})
    unit_price:number;
    @ApiProperty({example:"number"})
    line_total:number;
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


export { order_items };