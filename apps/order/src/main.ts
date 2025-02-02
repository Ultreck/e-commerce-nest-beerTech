import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrderModule, {
    transport: Transport.TCP,
   options: {
    host: 'localhost',
    port: parseInt(process.env.USER_SERVICE_PORT || '3002', 10),
   },
  });
  await app.listen();
}
bootstrap();
