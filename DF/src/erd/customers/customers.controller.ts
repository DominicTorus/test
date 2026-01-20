
import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers} from '@nestjs/common';
import { customersService } from './customers.service';
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
import { customersEntity } from './entity/customers.entity';
//import { CreateCustomersDto } from '../prisma/dto/create-customers.dto';
//import { UpdateCustomersDto } from '../prisma/dto/update-customers.dto';
import { CreatecustomersDto } from './dto/Createcustomers.dto';
import { UpdatecustomersDto } from './dto/Updatecustomers.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v10/uf/uf.service';

 
@Controller('customers')
@ApiTags('ERD API')
export class customersController {
  constructor(
    private readonly customersService: customersService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: customersEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the customers table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.customersService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: customersEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the customers table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.customersService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:Number})
  @ApiOkResponse({ type: customersEntity })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the customers table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('id') id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.customersService.findOne(+id,token);
    return plainToInstance(customersEntity, result);
  }
 
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiQuery({ name: 'id', required: false, type: Number})
  @ApiOkResponse({ type: customersEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the customers table',
  })
  
  async findAll(@Headers() authHeader: string,@Req() req: any,@Query("trs_creator_email") trs_creator_email?: string,@Query("trs_created_date") trs_created_date?: Date,@Query("trs_created_by") trs_created_by?: string,@Query("trs_modified_date") trs_modified_date?: Date,@Query("trs_modified_by") trs_modified_by?: string,@Query("trs_next_status") trs_next_status?: string,@Query("trs_status") trs_status?: string,@Query("trs_process_id") trs_process_id?: string,@Query("trs_access_profile") trs_access_profile?: string,@Query("trs_org_grp_code") trs_org_grp_code?: string,@Query("trs_org_code") trs_org_code?: string,@Query("trs_role_grp_code") trs_role_grp_code?: string,@Query("trs_role_code") trs_role_code?: string,@Query("trs_ps_grp_code") trs_ps_grp_code?: string,@Query("trs_ps_code") trs_ps_code?: string,@Query("trs_sub_org_grp_code") trs_sub_org_grp_code?: string,@Query("trs_sub_org_code") trs_sub_org_code?: string,@Query('id') id?:string,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    let presentQueryKeys:any=[
      'id',
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
    const result = this.customersService.findAll(token,trs_creator_email,trs_created_date,trs_created_by,trs_modified_date,trs_modified_by,trs_next_status,trs_status,trs_process_id,trs_access_profile,trs_org_grp_code,trs_org_code,trs_role_grp_code,trs_role_code,trs_ps_grp_code,trs_ps_code,trs_sub_org_grp_code,trs_sub_org_code,+id);
    return plainToInstance(customersEntity, result);
  } 

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreatecustomersDto })
  @ApiOkResponse({ type: customersEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the customers table',
  })
  
  async create(@Headers() authHeader: string,@Body() createcustomersDto: Prisma.customersCreateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.customersService.create(createcustomersDto,token);
    return plainToInstance(customersEntity, result);
  }
 
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:Number})
  @ApiBody({ type: UpdatecustomersDto })
  @ApiOkResponse({ type: customersEntity })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the customers table',
  })
    
  async update(@Headers() authHeader: string,@Param('id') id:number,
    @Body() updatecustomersDto: Prisma.customersUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.customersService.update(+id,updatecustomersDto,token);
    return plainToInstance(customersEntity, result);
  }
 
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:Number})
  @ApiOkResponse({ type: customersEntity })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the customers table',
  })
  
  async remove(@Headers() authHeader: string,@Param('id') id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result =  this.customersService.remove(+id,token);
    return plainToInstance(customersEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: customersEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the customers table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.customersService.findFirst(token);
    return plainToInstance(customersEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: customersEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the customers table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.customersService.findLast(token);
    return plainToInstance(customersEntity, result);
  }
}