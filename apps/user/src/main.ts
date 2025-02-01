import { NestFactory } from "@nestjs/core";
import { UserModule } from "./user.module";
import { Transport } from "@nestjs/microservices";


async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      host: "localhost",
      port: parseInt(process.env.USER_SERVICE_PORT || "3001", 10),
    }
  });
  await app.listen();
} 
bootstrap();