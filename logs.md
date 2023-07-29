### 0729 fisrt commit

```
to check cli command

nest -h 
```

1.  install nest package

npm i -g @nestjs/cli
```
src
    - app.controller.spec.ts
    - app.controller.ts
    - app.module.ts
    - app.service.ts
    - main.ts
```


2. init project: build boilerplate	

`nest new` nestube

### 0729 commit 1

work

1. install dotenv

2. save enviorment variable for PORT

### 0729 commit 2


1. create Controller 

![](https://docs.nestjs.com/assets/Controllers_1.png)


```
nest g controller Users

src - users - users.controller.ts
            - users.controller.spec.ts

```

```
nest g resource Users

https://docs.nestjs.com/controllers

src - users - users.controller.ts
            - users.module.ts
            - users.service.ts
```


naive comparison with express
```
Nest Controller = express Router
Nest Service = express Controller
```

### Error

app module doens't have usersservice as provider 

add manually


### 0729 install typeorm and mysql

https://docs.nestjs.com/techniques/database

1. install typeORM, mysql2, 
npm install --save @nestjs/typeorm typeorm mysql2

- @ means a scoped package.

 @nestjs/typeorm means package for typeorm from coreteam of nestjs

2. cannot connect to mysql DB

- don't seperate enviorment 
    - install linux mysql

3. cannot access ""@"localhost"

- dotenv/config is not propery imported

special thanks to 
- install mysql to ubuntu: 
https://velog.io/@seungsang00/Ubuntu-%EC%9A%B0%EB%B6%84%ED%88%AC%EC%97%90-MySQL-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0

- how to give priviledge to user
https://oneul-losnue.tistory.com/108


### 0729 install class validator to create Entity column

https://www.npmjs.com/package/class-validator

### 0720 install express-session and typeorm-store

npm i express-session
npm i @types/express-session

npm i typeorm-store

### Error: cannot install typeorm-store, it has dependencies problem


```
code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! 
npm ERR! While resolving: nestube@0.0.1
npm ERR! Found: typeorm@0.3.17
npm ERR! node_modules/typeorm
npm ERR!   typeorm@"^0.3.17" from the root project
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer typeorm@"^0.2.7" from typeorm-store@2.0.1
npm ERR! node_modules/typeorm-store
npm ERR!   typeorm-store@"*" from the root project
npm ERR! 
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR! 
npm ERR! 
npm ERR! For a full report see:
npm ERR! /home/yj/.npm/_logs/2023-07-29T07_12_45_093Z-eresolve-report.txt

npm ERR! A complete log of this run can be found in: /home/yj/.npm/_logs/2023-07-29T07_12_45_093Z-debug-0.log
```

alternative package: express-mysql-session

must review this code

```
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
```

### Error: typeORMModule doesn't exported

```s
[Nest] 56191  - 07/29/2023, 5:33:22 PM   ERROR [ExceptionHandler] Nest can't resolve dependencies of the UsersService (?). Please make sure that the argument UserEntityRepository at index [0] is available in the AppModule context.

Potential solutions:
- Is AppModule a valid NestJS module?
- If UserEntityRepository is a provider, is it part of the current AppModule?
- If UserEntityRepository is exported from a separate @Module, is that module imported within AppModule?
  @Module({
    imports: [ /* the Module containing UserEntityRepository */ ]
  })

Error: Nest can't resolve dependencies of the UsersService (?). Please make sure that the argument UserEntityRepository at index [0] is available in the AppModule context.

Potential solutions:
- Is AppModule a valid NestJS module?
- If UserEntityRepository is a provider, is it part of the current AppModule?
- If UserEntityRepository is exported from a separate @Module, is that module imported within AppModule?
  @Module({
    imports: [ /* the Module containing UserEntityRepository */ ]
  })
```

```ts
@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule] // this is requires
})
```

### 0720 specify create 

1.  make an `entity`

2. update entities option on `app.module.ts` typeormModule.forRoot

3. update `users.module`
```ts
{
imports: [TypeORMModule.forFeature([UserEntity])]
export: [TypeORMModule]
}
```
4. inject repository to userService

```ts
 constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
```

5. deal async await with userService


### 0730 first commit

add bycrypt to hash password before insert

by listener typeorm