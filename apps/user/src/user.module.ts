import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', //process.env.DB_HOST,
      port:  5432, //parseInt(process.env.DB_PORT || '5432', 10),
      username: 'emmolly', //process.env.DB_USERNAME,
      password: 'emmolly', //process.env.DB_PASSWORD,
      database: 'ecommerce_db', //process.env.DB_DATABASE,
      entities: [User],
      synchronize: true, // set to false in production
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn:  process.env.JWT_EXPIRES_IN},
    })
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
