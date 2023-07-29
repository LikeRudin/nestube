import { IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,} from "typeorm";


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


}