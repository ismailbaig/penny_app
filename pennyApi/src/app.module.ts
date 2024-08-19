import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupController } from './signup/signup.controller';
import { UsersService } from './signup/signup.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './signup/userSchema';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orderts.service';
import { Order, OrderSchema } from './orders/orderSchema';
import { Product, ProductSchema } from './products/productSchema';
import { ProductsService } from './products/products.service';
import { ProducsController as ProductsController } from './products/products.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginService } from './login/login.service';
import { LoginController } from './login/login.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'my-key', // Replace with your secret key
      signOptions: { expiresIn: '1m' }, // Token expiration time
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/pennydb'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register User schema
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), // Register Order schema
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), // Register Product schema
  ],
  controllers: [
    AppController,
    SignupController,
    OrdersController,
    ProductsController,
    LoginController,
    DashboardController,
  ],
  providers: [
    JwtStrategy,
    AppService,
    UsersService,
    OrdersService,
    ProductsService,
    LoginService,
    DashboardService
  ],
})
export class AppModule {}
