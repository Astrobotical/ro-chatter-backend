import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class FriendsList {

    @PrimaryGeneratedColumn()
    fID: number | undefined;

    @Column("text")
    userID: string | undefined;

    @Column("text")
    friendID: string | undefined;

    @Column("text")
    friendStatus: string | undefined;

    @Column("text")
    friendSince: string | undefined;
}