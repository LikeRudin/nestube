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


### 0807 create-user validator

1. `npm install class-validator`

2. create DTO file

3. set app.GlobalPipes(new ValidationPipe {
  whiltelist,
  forbidenNonWhitelist,
  transformer
})

```ts
//users/dto/create-user.dto.ts
import { IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    readonly username:string;

    @IsString()
    readonly password:string;
}
```



```ts
//main.ts
 app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
```

https://www.npmjs.com/package/class-validator
https://dev.to/sarathsantoshdamaraju/nestjs-and-class-validator-cheat-sheet-13ao

before class-validator
```json
Post http://localhost:8000/users/join

{
	"username": "test99",
	"password": "test99",
	"kimchi": "delicious"
}

{
	"ok": false,
	"message": "username already exists"
}
```
after class validator

```json
{
	"username": "test99",
	"password": "test99",
	"kimchi": "delcious"
}

{
	"message": [
		"property kimchi should not exist"
	],
	"error": "Bad Request",
	"statusCode": 400
}
```

always remeber: DTO should used as type for input of controller

```ts
@Post("/join")
async join(@Body() userdata: CreateUserDto, @Req() req: Request)
```

### add password confirmastion on join logic
```ts
 if (password !== passwordConfirm) {
      return {
        ok: false,
        message: `password doesn't match`
      }
    }
```

```json
{
	"username": "test98",
	"password": "test98",
	"passwordConfirm": "test99"
}
{
	"ok": false,
	"message": "password doesn't match"
}

```

### 0807 add properties to userEntity

age: number

gender: string

```json
{
	"username": "test00",
	"password": "test00",
	"passwordConfirm": "test00",
	"email": "blueskyto@me.com",
	"age": 2080,
	"gender": "attack-helicopter"
}

{
	"ok": true,
	"userdata": {
		"username": "test00",
		"password": "test00",
		"passwordConfirm": "test00",
		"email": "blueskyto@me.com",
		"age": 2080,
		"gender": "attack-helicopter"
	}
}

```


### 0807 💥Error

```s
[Nest] 39792  - 08/07/2023, 8:47:18 PM   ERROR [ExceptionsHandler] Property "0" was not found in "UserEntity". Make sure your query is correct.
```

### 0812 💥 Property "0" was not found in "UserEntity"

handle above Error 

when quering with `where` option,
cannot submit options as `key:value` shape

```js
// this is not correct
{where: [username:"target Name", email: "target Email"]}

// this is correct
{where: [{username:"target Name"}, {email : "target Email"}]}

```

### 0812 💥 query returns empty object

if i don;t give a `await` keyword,
then `findOne` query return empty object

remember, empty objects like `{}, []` are not falsy


