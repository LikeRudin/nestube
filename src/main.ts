import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`server is running on http://localhost:${PORT}/`)
}
bootstrap();
