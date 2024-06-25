import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Messages {

    @PrimaryGeneratedColumn()
    mID: number | undefined;

    @Column("text")
    chatID: string | undefined;
    
    @Column("text")
    message: string | undefined;

    @Column("text")
    sender: string | undefined;

    @Column("text")
    receiver: string | undefined;

    @Column("text")
    time: string | undefined;

    @Column("text")
    status: string | undefined;
}