
import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers} from '@nestjs/common';
import { order_itemsService } from './order_items.service';
import { Prisma } from '@prisma/client';
import { ApiOkResponse, ApiTags,ApiOperation,ApiBody,
  ApiQuery,ApiParam,
  ApiBadRequestResponse,ApiUnauthorizedResponse,
  ApiForbiddenResponse,ApiNotAcceptableResponse,
  ApiConflictResponse,ApiNotFoundResponse,
  ApiMethodNotAllowedResponse,
  ApiRequestTimeoutResponse,
  ApiGoneResponse,
  ApiUnsupportedMediaTypeResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
  ApiNotImplementedResponse,
  ApiBadGatewayResponse,
  ApiServiceUnavailableResponse,
  ApiGatewayTimeoutResponse,
  ApiBearerAuth 
} from '@nestjs/swagger';
import { order_itemsEntity } from './entity/order_items.entity';
//import { CreateOrderItemsDto } from '../prisma/dto/create-orderItems.dto';
//import { UpdateOrderItemsDto } from '../prisma/dto/update-orderItems.dto';
import { Createorder_itemsDto } from './dto/Createorder_items.dto';
import { Updateorder_itemsDto } from './dto/Updateorder_items.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v4/uf/uf.service';

 
@Controller('order_items')
@ApiTags('ERD API')
export class order_itemsController {
  constructor(
    private readonly order_itemsService: order_itemsService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: order_itemsEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the order_items table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.order_itemsService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: order_itemsEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the order_items table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.order_itemsService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':order_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'order_id',type:Number})
  @ApiOkResponse({ type: order_itemsEntity })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the order_items table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('order_id') order_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.order_itemsService.findOne(+order_id,token);
    return plainToInstance(order_itemsEntity, result);
  }
 
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiQuery({ name: 'order_id', required: false, type: Number})
  @ApiOkResponse({ type: order_itemsEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the order_items table',
  })
  
  async findAll(@Headers() authHeader: string,@Req() req: any,@Query("trs_creator_email") trs_creator_email?: string,@Query("trs_created_date") trs_created_date?: Date,@Query("trs_created_by") trs_created_by?: string,@Query("trs_modified_date") trs_modified_date?: Date,@Query("trs_modified_by") trs_modified_by?: string,@Query("trs_next_status") trs_next_status?: string,@Query("trs_status") trs_status?: string,@Query("trs_process_id") trs_process_id?: string,@Query("trs_access_profile") trs_access_profile?: string,@Query("trs_org_grp_code") trs_org_grp_code?: string,@Query("trs_org_code") trs_org_code?: string,@Query("trs_role_grp_code") trs_role_grp_code?: string,@Query("trs_role_code") trs_role_code?: string,@Query("trs_ps_grp_code") trs_ps_grp_code?: string,@Query("trs_ps_code") trs_ps_code?: string,@Query("trs_sub_org_grp_code") trs_sub_org_grp_code?: string,@Query("trs_sub_org_code") trs_sub_org_code?: string,@Query('order_id') order_id?:string,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    let presentQueryKeys:any=[
      'order_id',
      "trs_creator_email",
      "trs_created_date",
      "trs_created_by",
      "trs_modified_date",
      "trs_modified_by",
      "trs_next_status",
      "trs_status",
      "trs_process_id",
      "trs_access_profile",
      "trs_org_grp_code",
      "trs_org_code",
      "trs_role_grp_code",
      "trs_role_code",
      "trs_ps_grp_code",
      "trs_ps_code",
      "trs_sub_org_grp_code",
      "trs_sub_org_code"
    ]
    let comingQueryKeys:any=Object.keys(query)||[]
    let isComingQuerysAreValid=true;
    if(comingQueryKeys.length==0)
      {
        isComingQuerysAreValid = true;
      }
  
      // If arrays have different lengths, they cannot be equal
      if (comingQueryKeys.length > presentQueryKeys.length) {
        isComingQuerysAreValid= false;
      }
      // Compare each element after sorting
      for (let i = 0; i < comingQueryKeys.length; i++) {
        if (!presentQueryKeys.includes(comingQueryKeys[i])) {
          isComingQuerysAreValid=false;
        }
      }
    if (req.originalUrl.includes('?') && req.originalUrl.split('?')[1].includes('/') || isComingQuerysAreValid==false) {
      throw new NotFoundException('Invalid query parameter structure.');
    }
    const result = this.order_itemsService.findAll(token,trs_creator_email,trs_created_date,trs_created_by,trs_modified_date,trs_modified_by,trs_next_status,trs_status,trs_process_id,trs_access_profile,trs_org_grp_code,trs_org_code,trs_role_grp_code,trs_role_code,trs_ps_grp_code,trs_ps_code,trs_sub_org_grp_code,trs_sub_org_code,+order_id);
    return plainToInstance(order_itemsEntity, result);
  } 

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: Createorder_itemsDto })
  @ApiOkResponse({ type: order_itemsEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the order_items table',
  })
  
  async create(@Headers() authHeader: string,@Body() createorder_itemsDto: Prisma.order_itemsCreateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.order_itemsService.create(createorder_itemsDto,token);
    return plainToInstance(order_itemsEntity, result);
  }
 
  @Patch(':order_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'order_id',type:Number})
  @ApiBody({ type: Updateorder_itemsDto })
  @ApiOkResponse({ type: order_itemsEntity })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the order_items table',
  })
    
  async update(@Headers() authHeader: string,@Param('order_id') order_id:number,
    @Body() updateorder_itemsDto: Prisma.order_itemsUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.order_itemsService.update(+order_id,updateorder_itemsDto,token);
    return plainToInstance(order_itemsEntity, result);
  }
 
  @Delete(':order_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'order_id',type:Number})
  @ApiOkResponse({ type: order_itemsEntity })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the order_items table',
  })
  
  async remove(@Headers() authHeader: string,@Param('order_id') order_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result =  this.order_itemsService.remove(+order_id,token);
    return plainToInstance(order_itemsEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: order_itemsEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the order_items table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.order_itemsService.findFirst(token);
    return plainToInstance(order_itemsEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: order_itemsEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the order_items table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.order_itemsService.findLast(token);
    return plainToInstance(order_itemsEntity, result);
  }
}