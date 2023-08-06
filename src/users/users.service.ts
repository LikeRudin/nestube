import { Injectable } from '@nestjs/common';
import { UserEntity  } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {compare} from "bcrypt";

interface Request {
  session: any
}


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}


  async createUser (userdata: any, req: Request) {
    const {username, password } = userdata;
    const exist = await this.usersRepository.findOne({where:[{username}]});

    if (exist) {
      return { 
        ok: false,
        message: `username already exists`
      };
    }
    const user = await this.usersRepository.save(this.usersRepository.create({username, password}));
    
    req.session.user = user;

    return { "ok": true, userdata}
    
  }

  async login(loginData, req){
    const {username, password} = loginData;
    const user = await this.usersRepository.findOne({
      where: [{username}]
    })

    if (!user) {
      return { 
        ok: false,
        message: "user not found"
      };
    }
    const passwordOk = await compare(password, user.password)
  
    if (!passwordOk) {
      return { 
        ok: false,
        message: "you submit wrong password"
      };
    }
    req.session.user = user;
    return { "ok": true, loginData}
  }

  async logout (req) {
    return await req.session.destroy();
  } 
}
