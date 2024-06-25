import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Chat {

    @PrimaryGeneratedColumn()
    chatID: number | undefined;

    @Column("text")
    chatStatus: string | undefined;

    @Column("text")
    chatMemberOne: string | undefined;

    @Column("text")
    chatMemberTwo: string | undefined;

    @Column("text")
    chatCreated: string | undefined;
    
    @Column("text")
    chatUpdated: string | undefined;
}