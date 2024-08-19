import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrdersService } from './orderts.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('gtuo/:email')
  async getUserOrder(@Param('email')   
  email: string) {
    return await this.ordersService.getUserOrder(email);
  }
}