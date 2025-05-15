import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { corsConfig } from "./config/cors.config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.enableCors(corsConfig);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
