import { HttpStatus, Module } from '@nestjs/common';
import { customersModule } from './customers/customers.module';   
import { productsModule } from './products/products.module';   
import { ordersModule } from './orders/orders.module';   
import { order_itemsModule } from './order_items/order_items.module';   
import { vgph_system_setupModule } from './vgph_system_setup/vgph_system_setup.module';   
import { userModule } from './user/user.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [customersModule,productsModule,ordersModule,order_itemsModule,vgph_system_setupModule,userModule],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
