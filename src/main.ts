import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config";
import * as session from 'express-session';
import * as MySQLStore from 'express-mysql-session';
import * as mysql2 from "mysql2/promise";
import { ValidationPipe } from '@nestjs/common';


const PORT = process.env.PORT || 3000;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sessionOption = {
    connectionLimit: 24 * 3600,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    createDatabaseTable: true
  }

  const connection = mysql2.createPool(sessionOption);
  const sessionStore = new (MySQLStore(session))({}, connection);
  


  app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store:sessionStore
  }));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  await app.listen(PORT);
  console.log(`server is running on http://localhost:${PORT}/`)
}
bootstrap();
