import { HttpStatus, Module } from '@nestjs/common';
import { usertransactionsModule } from './usertransactions/usertransactions.module';   
import { customersModule } from './customers/customers.module';   
import { productsModule } from './products/products.module';   
import { ordersModule } from './orders/orders.module';   
import { order_itemsModule } from './order_items/order_items.module';   
import { vgph_system_setupModule } from './vgph_system_setup/vgph_system_setup.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [usertransactionsModule,customersModule,productsModule,ordersModule,order_itemsModule,vgph_system_setupModule],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
