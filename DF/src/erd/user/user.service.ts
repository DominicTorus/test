
import { HttpException, Injectable,HttpStatus,InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as v from 'valibot';
import { errorObj } from 'src/dto';
import { CommonService } from 'src/common.Service';
import { parsePrismaCreateError } from 'src/prisma-error-handler';
import { userEntity } from './entity/user.entity';
import { CustomException } from 'src/customException';
@Injectable()
export class userService {
  constructor(private readonly prismaService: PrismaService,
  private readonly commonService: CommonService) {}
  private encryptedCols: any={
  "customers": [],
  "products": [],
  "orders": [
    {
      "column": "order_items",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "order_items": [],
  "vgph_system_setup": [],
  "user": []
}

  async encryptData(data: any, tableName: string, method) {
    let encryptedData = { ...data };
    const columns = this.encryptedCols[tableName];
    if (!columns) return encryptedData;
    for (const table of columns) {
      if (table?.column in data && table.dataType === 'String') {
        const encryptedValue = await this.commonService.encrypt(
          data[table.column],table.column
        );
        encryptedData[table.column] = encryptedValue;
      } else if (table?.column in data && table.dataType === 'childtable') {
        if (
          data[table.column][method] &&
          !Array.isArray(data[table.column][method])
        ) {
          encryptedData[table.column][method] = await this.encryptData(
            data[table.column][method],
            table.column,
            method,
          );
        } else if (
          data[table.column][method] &&
          Array.isArray(data[table.column][method])
        ) {
          let tempArray = [];
          for (const chlldArray of data[table.column][method]) {
            tempArray.push(
              await this.encryptData(chlldArray, table.column, method),
            );
          }
          encryptedData[table.column]['create'] = tempArray;
        }
      } else if (
        table?.column in data &&
        table.dataType === 'Object'
      ) {
        let encryptedValue : any;
          if(Object.keys(data[table.column])[0] == "some"){
            encryptedValue = await this.encryptData(
              data[table.column].some,
              table?.interRelation,
              method,
            );
            encryptedData[table.column]["some"] = encryptedValue;
          }else if(Object.keys(data[table.column])[0] == "is"){
            encryptedValue = await this.encryptData(
              data[table.column].is,
              table?.interRelation,
              method,
            );
            encryptedData[table.column]["is"] = encryptedValue;
          }else{
            encryptedValue = await this.encryptData(
              data[table.column],
              table?.interRelation,
              method,
            );
            encryptedData[table.column] = encryptedValue;
          }
      } else if (
        table?.column in data &&
        table.dataType === 'Array' &&
        table?.interRelation != ''
      ) {
        let arrayObject: any = [];
        let check = data[table.column]
        if(!Array.isArray(check)){
          let encryptedValue : any;
          if(Object.keys(check)[0] == "some"){
            encryptedValue = await this.encryptData(
              check.some,
              table?.interRelation,
              method,
            );
            encryptedData[table.column]["some"] = encryptedValue;
          }
          if(Object.keys(check)[0] == "is"){
            encryptedValue = await this.encryptData(
              check.is,
              table?.interRelation,
              method,
            );
            encryptedData[table.column]["is"] = encryptedValue;
          }
        
        }else{
          for (const eachObject of data[table.column]) {
            const encryptedValue = await this.encryptData(
              eachObject,
              table?.interRelation,
              method,
            );
            arrayObject.push(encryptedValue);
          }
          encryptedData[table.column] = arrayObject;
        }
      }
    }
    return encryptedData;
  }

   async decryptData(data: any, tableName: string) {
    if (typeof data == 'string') return data;

    let encryptedData = { ...data };
    const columns = this.encryptedCols[tableName];
    if (!columns) return encryptedData;
    for (const table of columns) {
      if (table?.column in data && table.dataType == 'String') {
        if (
          data[table.column] != null &&
          data[table?.column] != '' &&
          data[table.column].startsWith('vault:')
        ) {
          const encryptedValue = await this.commonService.decrypt(
            data[table.column],
            table.column
          );
          encryptedData[table.column] = encryptedValue;
        }
      }
    }
    for (const key in encryptedData) {
      if (
        typeof encryptedData[key] === 'object' &&
        encryptedData[key] !== null
      ) {
        if (Array.isArray(encryptedData[key])) {
          let arrayDocName: string = '';
          this.encryptedCols[tableName].forEach((element: any) => {
            if (
              element.column == key &&
              element.interRelation != '' &&
              element.dataType == 'Array'
            ) {
              arrayDocName = element.interRelation;
            }
          });
          if (arrayDocName != '') {
            let tempArray = [];
            for (const eachObject of encryptedData[key]) {
              tempArray.push(await this.decryptData(eachObject, arrayDocName));
            }
            encryptedData[key] = tempArray;
          } else {
            let tempArray = [];
            for (const eachObject of encryptedData[key]) {
              tempArray.push(await this.decryptData(eachObject, key));
            }

            encryptedData[key] = tempArray;
          }
        } else if (Object.keys(encryptedData[key]).length > 0) {
          let docName: string = '';
          this.encryptedCols[tableName].forEach((element: any) => {
            if (
              element.column == key &&
              element.interRelation != '' &&
              (element.dataType == 'Object' || element.dataType == 'Array')
            ) {
              docName = element.interRelation;
            }
          });

          if (docName != '') {
            encryptedData[key] = await this.decryptData(
              encryptedData[key],
              docName,
            );
          } else {
            encryptedData[key] = await this.decryptData(
              encryptedData[key],
              key,
            );
          }
        }
      }
    }
    return encryptedData;
  }

  async findSchema (token) {
    const data = {
      id:"number",
      username:"string",
      debtoracc:"string",
      creditoracc:"string",
      bank:"string",
      account:"number",
      trs_creator_email:"string",
      trs_created_date:"Date",
      trs_created_by:"string",
      trs_modified_date:"Date",
      trs_modified_by:"string",
      trs_next_status:"string",
      trs_status:"string",
      trs_process_id:"string",
      trs_access_profile:"string",
      trs_org_grp_code:"string",
      trs_org_code:"string",
      trs_role_grp_code:"string",
      trs_role_code:"string",
      trs_ps_grp_code:"string",
      trs_ps_code:"string",
      trs_sub_org_grp_code:"string",
      trs_sub_org_code:"string"
    }
    return data;
  }

 async findAllmethod(queryDto: any, limit:number,selectColumns:any,token:any) {
    try {
      let queryCondition:any ={}
      let queryValue:any = {}
      let columns:any = {}
      selectColumns.forEach(element => {
        columns[element] = true
      });
      Object.keys(queryDto).forEach((key) => {
        if (key.includes('-')) {
          queryCondition[key.split('-')[0]] = key.split('-')[1]
          queryValue[key.split('-')[0]] = queryDto[key]
        }
      })      
      const { page }: { page: number } = queryDto;
      let query: any = {}; 
      const { id }: {id : number} = queryValue;
      const { username }: {username : string} = queryValue;
      const { debtoracc }: {debtoracc : string} = queryValue;
      const { creditoracc }: {creditoracc : string} = queryValue;
      const { bank }: {bank : string} = queryValue;
      const { account }: {account : number} = queryValue;

      if(id){ 
        query.id = { [queryCondition['id']]: id };
      }
      if(username){ 
        query.username = { [queryCondition['username']]: username };
      }
      if(debtoracc){ 
        query.debtoracc = { [queryCondition['debtoracc']]: debtoracc };
      }
      if(creditoracc){ 
        query.creditoracc = { [queryCondition['creditoracc']]: creditoracc };
      }
      if(bank){ 
        query.bank = { [queryCondition['bank']]: bank };
      }
      if(account){ 
        query.account = { [queryCondition['account']]: account };
      }
      const skip = (page - 1) * limit;
      if (Object.keys(query).length > 0) {
        const banks = await this.prismaService.user.findMany({
          select:columns,
          where: query,          
        });
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'user');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      if(!skip && !limit && Object.keys(query).length == 0){
        const banks = await this.prismaService.user.findMany({
          select:columns,
        });
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'user');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      const banks = await this.prismaService.user.findMany({
        select:columns,
        where: query,
        skip: skip,
        take: limit,
      });

      const totalItems = await this.prismaService.user.count({
        where: query,
      });

      let decryptedRes: any = [];
      for (const indiviual of banks) {
        const decryptedData = await this.decryptData(indiviual, 'user');
        decryptedRes.push(decryptedData);
      }
      return {
        items: decryptedRes,
        totalPages: Math.ceil(totalItems / limit),
      };
    } catch (error) {
      const errorMessage = 'Error in findAllmethod';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG020",
        error,
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:CG:AFGK:TG1:AFK:User:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
    }
  }

  async findOne(id:number,token : string) {
    try{
      const res = await this.prismaService.user.findUnique({ 
      where: {id},
      select: {id:true,username:true,debtoracc:true,creditoracc:true,bank:true,account:true,        trs_creator_email:true,
        trs_created_date:true,
        trs_created_by:true,
        trs_modified_date:true,
        trs_modified_by:true,
        trs_next_status:true,
        trs_status:true,
        trs_process_id:true,
        trs_access_profile:true,
        trs_org_grp_code:true,
        trs_org_code:true,
        trs_role_grp_code:true,
        trs_role_code:true,
        trs_ps_grp_code:true,
        trs_ps_code:true,
        trs_sub_org_code:true,
        trs_sub_org_grp_code:true
        }
    });
    return  await this.decryptData(res, 'user');
  } catch (error) {
    const errorMessage = 'Error in findOne';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG024",
        error,
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:CG:AFGK:TG1:AFK:User:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
  }
  }

  async findAll(token : string,trs_creator_email?: string,trs_created_date?: Date,trs_created_by?: string,trs_modified_date?: Date,trs_modified_by?: string,trs_next_status?: string,trs_status?: string,trs_process_id?: string,trs_access_profile?: string,trs_org_grp_code?: string,trs_org_code?: string,trs_role_grp_code?: string,trs_role_code?: string,trs_ps_grp_code?: string,trs_ps_code?: string,trs_sub_org_grp_code?: string,trs_sub_org_code?: string
) {
    try{
      const whereClause: any = {};
      if (trs_creator_email) {
        whereClause.trs_creator_email = trs_creator_email;
      }
      if (trs_created_date) {
        whereClause.trs_created_date = trs_created_date;
      }
      if (trs_created_by) {
        whereClause.trs_created_by = trs_created_by;
      }
      if (trs_modified_date) {
        whereClause.trs_modified_date = trs_modified_date;
      }
      if (trs_modified_by) {
        whereClause.trs_modified_by = trs_modified_by;
      }
      if (trs_next_status) {
        whereClause.trs_next_status = trs_next_status;
      }
      if (trs_status) {
        whereClause.trs_status = trs_status;
      }
      if (trs_process_id) {
        whereClause.trs_process_id = trs_process_id;
      }
      if (trs_access_profile) {
        whereClause.trs_access_profile = trs_access_profile;
      }
      if (trs_org_grp_code) {
        whereClause.trs_org_grp_code = trs_org_grp_code;
      }
      if (trs_org_code) {
        whereClause.trs_org_code = trs_org_code;
      }
      if (trs_role_grp_code) {
        whereClause.trs_role_grp_code = trs_role_grp_code;
      }
      if (trs_role_code) {
        whereClause.trs_role_code = trs_role_code;
      }
      if (trs_ps_grp_code) {
        whereClause.trs_ps_grp_code = trs_ps_grp_code;
      }
      if (trs_ps_code) {
        whereClause.trs_ps_code = trs_ps_code;
      }
      if (trs_sub_org_grp_code) {
        whereClause.trs_sub_org_grp_code = trs_sub_org_grp_code;
      }
      if (trs_sub_org_code) {
        whereClause.trs_sub_org_code = trs_sub_org_code;
      }
      const res = await this.prismaService.user.findMany({ 
      where: whereClause,
      select: {id:true,username:true,debtoracc:true,creditoracc:true,bank:true,account:true,        trs_creator_email:true,
        trs_created_date:true,
        trs_created_by:true,
        trs_modified_date:true,
        trs_modified_by:true,
        trs_next_status:true,
        trs_status:true,
        trs_process_id:true,
        trs_access_profile:true,
        trs_org_grp_code:true,
        trs_org_code:true,
        trs_role_grp_code:true,
        trs_role_code:true,
        trs_ps_grp_code:true,
        trs_ps_code:true,
        trs_sub_org_code:true,
        trs_sub_org_grp_code:true
      }
      });
      let decryptedRes: any = [];
      for (const indiviual of res) {
        const decryptedData = await this.decryptData(indiviual, 'user');
        decryptedRes.push(decryptedData);
      }
      return decryptedRes;
    } catch (error) {
        const errorMessage = 'find All Error';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG023",
          error,
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:CG:AFGK:TG1:AFK:User:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
    }
    }
    
  async create(createuserDto: Prisma.userCreateInput,token:string) {
    try{

      const dataSchema:any =  v.object({
            username :  v.optional(v.string()), 
            debtoracc :  v.optional(v.string()), 
            creditoracc :  v.optional(v.string()), 
            bank :  v.optional(v.string()), 
            account :  v.optional(v.number()), 
        });
        let validate : any = v.safeParse(dataSchema,createuserDto);
        if (!validate.success) {
          let errorObj: errorObj = {
            tname: 'TG',
            errGrp: 'Data',
            fabric: 'DF',
            errType: 'Fatal',
            errCode: 'TG101',
          };
          const errorMessage = validate.issues[0].message;
          await this.commonService.errorLog(
            "Technical",
            'AK',
            'Fatal',
            "TG021",
            errorMessage,
            "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:CG:AFGK:TG1:AFK:User:AFVK:v1",
            token
          );
        }
        
      const res = await this.prismaService.user.create({ 
      data: await this.encryptData(createuserDto,'user','create'),
      select:{id:true,username:true,debtoracc:true,creditoracc:true,bank:true,account:true,trs_creator_email:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_next_status:true,trs_status:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true}
          
    })
    return await this.decryptData(res, 'user');
  } catch (error) {
    const errMsg = parsePrismaCreateError(error);
    const errorMessage = 'Create Error';
    await this.commonService.errorLog(
      "Technical",
      'AK',
      'Fatal',
      "TG022",
      errMsg,
      "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:CG:AFGK:TG1:AFK:User:AFVK:v1",
      token
    );
    throw new InternalServerErrorException(errMsg);
  }
    
  }

  async update(id:number, updateuserDto: Prisma.userUpdateInput,token:string) {   
    try{

      const dataSchema:any =  v.object({
          username :  v.optional(v.string()), 
          debtoracc :  v.optional(v.string()), 
          creditoracc :  v.optional(v.string()), 
          bank :  v.optional(v.string()), 
          account :  v.optional(v.number()), 
      });
      let validate : any = v.safeParse(dataSchema,updateuserDto);
      if (!validate.success) {
        let errorObj: errorObj = {
          tname: 'TG',
          errGrp: 'Data',
          fabric: 'DF',
          errType: 'Fatal',
          errCode: 'TG101',
        };
        const errorMessage = validate.issues[0].message;
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG025",
          errorMessage,
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:CG:AFGK:TG1:AFK:User:AFVK:v1",
          token
        );
      }
      const res = await this.prismaService.user.update({
      where: {id},
      data: await this.encryptData(updateuserDto,'user','update'),
      select: {id:true,username:true,debtoracc:true,creditoracc:true,bank:true,account:true,trs_creator_email:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_next_status:true,trs_status:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true}
    });
    return await this.decryptData(res, 'user');
    } catch (error) {
        const errorMessage = 'update Error';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG023",
          error,
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:CG:AFGK:TG1:AFK:User:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
    }  
}

  async remove(id:number,token : string) {
    try{
      const res = await this.prismaService.user.delete({
      where: {id },
      select: {id:true,username:true,debtoracc:true,creditoracc:true,bank:true,account:true,trs_creator_email:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_next_status:true,trs_status:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true}
    });
    return res;
  } catch (error) {
    const errorMessage = 'Error in remove Data';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG026",
        error,
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:CG:AFGK:TG1:AFK:User:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
  }
  }
  async findFirst(token : string) {
    try{
      const res = await this.prismaService.user.findFirst({ 
        orderBy: { trs_created_date: 'asc' },
      });
      return  await this.decryptData(res, 'user');
    } catch (error) {
      const errorMessage = 'Error in findFirst';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:CG:AFGK:TG1:AFK:User:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
      }
  }
  async findLast(token : string) {
    try{
      const res = await this.prismaService.user.findFirst({ 
        orderBy: { trs_created_date: 'desc' },
      });
      return  await this.decryptData(res, 'user');
    } catch (error) {
      const errorMessage = 'Error in findLast';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:CG:AFGK:TG1:AFK:User:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
      }
  }
}
