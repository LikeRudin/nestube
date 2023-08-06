import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/join")
  async join(@Body() userdata: CreateUserDto, @Req() req: Request){
    return await this.usersService.createUser(userdata, req as any);
    
  }

  @Post("/login")
  async login(@Body() loginData: any, @Req() req:Request) {
    return await this.usersService.login(loginData, req);
  
  }

  @Post("/logout")
  async logout(@Req() req:Request){
    return await this.usersService.logout(req);
  }

  @Delete("/delete")
  async delete(@Req() req:Request) {
    return await this.usersService.delete(req);
  }

}
