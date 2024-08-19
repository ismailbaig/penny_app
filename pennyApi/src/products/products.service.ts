import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, productDocument } from './productSchema';

@Injectable()
export class ProductsService {
constructor(
  @InjectModel(Product.name) private productModel: Model<productDocument>
) {}

  async getProductInfo(arr_product_id: Array<string>) {
    // mongo
    const products = await this.productModel.find({ product_id: {
         $in: arr_product_id } });
    return products;
  }
}
