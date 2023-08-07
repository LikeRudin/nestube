import { IsEmail, IsString } from "class-validator";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,} from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    dbId:number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    @Column()
    @IsString()
    username: string;

    @Column()
    @IsString()
    password: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    age: number;

    @Column()
    gender: string;

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