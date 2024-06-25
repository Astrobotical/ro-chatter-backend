import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    uID: number | undefined;

    @Column("text")
    userName: string | undefined;

    @Column("text")
    email: string | undefined;

    @Column("text")
    password: string| undefined;

    @Column("text")
    lastOnline: string | undefined;
}