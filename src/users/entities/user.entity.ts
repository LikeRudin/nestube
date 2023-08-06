import { IsEmail, IsString } from "class-validator";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,} from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    dbId:number;

    @CreateDateColumn()
    createdAt: Date;


    @Column()
    @IsString()
    username: string;

    @Column()
    @IsString()
    password: string;

    @Column()
    @IsEmail()
    email: string;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        try{
            this.password = await bcrypt.hash(this.password, 5);
        } catch (error){
            console.log(error)
            throw InternalServerErrorException
        }
    }


}