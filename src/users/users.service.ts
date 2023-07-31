import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return {a: "string", b:"he"};
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async createUser (userdata: any, req: Request) {
    const {username, password } = userdata;
    const exist = await this.usersRepository.findOne({
      where:[{username}]
    });

    if (exist) {
      return `username already exists`;
    }
    const user = await this.usersRepository.save(this.usersRepository.create({username, password}));
    
    req.session.user = user;

    return userdata
    
  }

  async login(loginData, req){
    const {username, password} = loginData;
    const user = await this.usersRepository.findOne({
      where: [{username}]
    })

    if (!user) {
      const errorMessage = {
        message: "user not found"
      }
      return errorMessage
    }

    const passwordOk = await compare(password, user.password)
  
    if (!passwordOk) {
      const errorMessage = {
        message: "you submit wrong password"
      }
      return errorMessage
    }
    req.session.user = user;
    return loginData;

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
