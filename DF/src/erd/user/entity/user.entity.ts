import { user } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { product_OnlyParentEntity } from '../../product/entity/product.entity';            



export class  userEntity implements user{
    @ApiProperty({example:"bigint"})
    userid:bigint;
    @ApiProperty({example:"string"})
    name:string;
    @ApiProperty({example:"number"})
    product_id:number;
    @ApiProperty({example:"string"})
    phone:string;
    @ApiProperty({example:"number"})
    age:number;
    @ApiProperty({ type: [product_OnlyParentEntity], required: false})
    product?: product_OnlyParentEntity[];               
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
    @ApiProperty({example:"string"})
    trs_locked_by: string;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    trs_locked_time: Date;
    @ApiProperty({example:"string"})
    trs_tenant_id: string;
    @ApiProperty({example:"string"})
    trs_app_code: string;
    @ApiProperty({example:"string"})
    trs_product_code: string;
    @ApiProperty({example:"string"})
    trs_event_process_status: string;
    @ApiProperty({example:"string"})
    trs_event_status: string;
}
      
export class  user_OnlyParentEntity {
    @ApiProperty({example:"bigint"})
    userid:bigint;
    @ApiProperty({example:"string"})
    name:string;
    @ApiProperty({example:"number"})
    product_id:number;
    @ApiProperty({example:"string"})
    phone:string;
    @ApiProperty({example:"number"})
    age:number;
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
    @ApiProperty({example:"string"})
    trs_locked_by: string;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    trs_locked_time: Date;
    @ApiProperty({example:"string"})
    trs_tenant_id: string;
    @ApiProperty({example:"string"})
    trs_app_code: string;
    @ApiProperty({example:"string"})
    trs_product_code: string;
    @ApiProperty({example:"string"})
    trs_event_process_status: string;
    @ApiProperty({example:"string"})
    trs_event_status: string;
}


export { user };