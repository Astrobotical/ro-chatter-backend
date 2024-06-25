import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Notifications {

    @PrimaryGeneratedColumn()
    nID: number | undefined;

    @Column("text")
    userID: string | undefined;
    
    @Column("text")
    notification: string | undefined;

    @Column("text")
    notificationType: string | undefined;

    @Column("text")
    notificationTime: string | undefined;
}