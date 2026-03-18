import { HttpStatus, Module } from '@nestjs/common';
import { userModule } from './user/user.module';   
import { productModule } from './product/product.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [userModule,productModule],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
