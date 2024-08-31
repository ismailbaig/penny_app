import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, orderDocument } from './schemas/orderSchema';
import { UsersService } from '../signup/signup.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
//   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
constructor(private readonly userService: UsersService,
    private readonly productService: ProductsService,
    @InjectModel(Order.name) private orderModel: Model<orderDocument>
) {}

  async getUserOrder(uemail: string) {
    // mongo
    var userInfo= this.userService.getLoggedInUserInfo(uemail);
    const orderInfo = await this.orderModel.findOne({
        user_id: await userInfo
      });
    // product service calls mongo and gives products data
    var productsInfo = this.productService.getProductInfo(orderInfo.product_id);
    
    return productsInfo;
  }
}
