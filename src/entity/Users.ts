import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn} from "typeorm"; 
import { IsEmail, IsNotEmpty, IsDate, Length, IsOptional, Validate, Min, Max,IsPhoneNumber} from "class-validator";

enum Gender {"Male", "Female", "Other"};

@Entity( ) 
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 250})
    @IsNotEmpty()
    name: string;
    
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ unique: true })
    password: string;

    @Column({ unique: true  })
    @IsPhoneNumber()
    phone: string;

    // @Column('int',{ unique: true  })
    // @IsNotEmpty()
    // phone: number;

    @Column({
        type: "enum",
        enum: ["Male", "Female", "Other"],
        default: "Male"
    })
    @IsNotEmpty()
    gender: Gender;

    @Column({ nullable: true })
    token: string;

    // @Column({
    //     type:"boolean",
    //     default: false
    // })
    // isEmailVerified!: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  
}