
import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers} from '@nestjs/common';
import { usertransactionsService } from './usertransactions.service';
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
import { usertransactionsEntity } from './entity/usertransactions.entity';
//import { CreateUsertransactionsDto } from '../prisma/dto/create-usertransactions.dto';
//import { UpdateUsertransactionsDto } from '../prisma/dto/update-usertransactions.dto';
import { CreateusertransactionsDto } from './dto/Createusertransactions.dto';
import { UpdateusertransactionsDto } from './dto/Updateusertransactions.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v4/uf/uf.service';

 
@Controller('usertransactions')
@ApiTags('ERD API')
export class usertransactionsController {
  constructor(
    private readonly usertransactionsService: usertransactionsService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: usertransactionsEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the usertransactions table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.usertransactionsService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: usertransactionsEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the usertransactions table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.usertransactionsService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':transactionid')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'transactionid',type:Number})
  @ApiOkResponse({ type: usertransactionsEntity })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the usertransactions table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('transactionid') transactionid:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.usertransactionsService.findOne(+transactionid,token);
    return plainToInstance(usertransactionsEntity, result);
  }
 
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: usertransactionsEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the usertransactions table',
  })
  
  async findAll(@Headers() authHeader: string,@Req() req: any,@Query("trs_creator_email") trs_creator_email?: string,@Query("trs_created_date") trs_created_date?: Date,@Query("trs_created_by") trs_created_by?: string,@Query("trs_modified_date") trs_modified_date?: Date,@Query("trs_modified_by") trs_modified_by?: string,@Query("trs_next_status") trs_next_status?: string,@Query("trs_status") trs_status?: string,@Query("trs_process_id") trs_process_id?: string,@Query("trs_access_profile") trs_access_profile?: string,@Query("trs_org_grp_code") trs_org_grp_code?: string,@Query("trs_org_code") trs_org_code?: string,@Query("trs_role_grp_code") trs_role_grp_code?: string,@Query("trs_role_code") trs_role_code?: string,@Query("trs_ps_grp_code") trs_ps_grp_code?: string,@Query("trs_ps_code") trs_ps_code?: string,@Query("trs_sub_org_grp_code") trs_sub_org_grp_code?: string,@Query("trs_sub_org_code") trs_sub_org_code?: string,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    let presentQueryKeys:any=[
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
    const result = this.usertransactionsService.findAll(token,trs_creator_email,trs_created_date,trs_created_by,trs_modified_date,trs_modified_by,trs_next_status,trs_status,trs_process_id,trs_access_profile,trs_org_grp_code,trs_org_code,trs_role_grp_code,trs_role_code,trs_ps_grp_code,trs_ps_code,trs_sub_org_grp_code,trs_sub_org_code,);
    return plainToInstance(usertransactionsEntity, result);
  } 

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateusertransactionsDto })
  @ApiOkResponse({ type: usertransactionsEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the usertransactions table',
  })
  
  async create(@Headers() authHeader: string,@Body() createusertransactionsDto: Prisma.usertransactionsCreateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.usertransactionsService.create(createusertransactionsDto,token);
    return plainToInstance(usertransactionsEntity, result);
  }
 
  @Patch(':transactionid')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'transactionid',type:Number})
  @ApiBody({ type: UpdateusertransactionsDto })
  @ApiOkResponse({ type: usertransactionsEntity })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the usertransactions table',
  })
    
  async update(@Headers() authHeader: string,@Param('transactionid') transactionid:number,
    @Body() updateusertransactionsDto: Prisma.usertransactionsUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.usertransactionsService.update(+transactionid,updateusertransactionsDto,token);
    return plainToInstance(usertransactionsEntity, result);
  }
 
  @Delete(':transactionid')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'transactionid',type:Number})
  @ApiOkResponse({ type: usertransactionsEntity })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the usertransactions table',
  })
  
  async remove(@Headers() authHeader: string,@Param('transactionid') transactionid:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result =  this.usertransactionsService.remove(+transactionid,token);
    return plainToInstance(usertransactionsEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: usertransactionsEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the usertransactions table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.usertransactionsService.findFirst(token);
    return plainToInstance(usertransactionsEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: usertransactionsEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the usertransactions table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.usertransactionsService.findLast(token);
    return plainToInstance(usertransactionsEntity, result);
  }
}