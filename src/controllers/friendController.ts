import { Request, Response } from 'express';
import { AppData, IonSocket } from '../server';
import { FriendsList } from '../entities/FriendsList';
export const addFriend = (req: Request, res: Response) => {
    const friendsListRepository = AppData.getRepository(FriendsList);
    friendsListRepository.query(`SELECT * FROM FriendsList WHERE (UserID = ${req.body.userID} AND FriendID = ${req.body.friendID}) OR (UserID = ${req.body.friendID} AND FriendID = ${req.body.userID})`)
        .then((friends) => {
            if (friends.length != 0) {
                return res.status(400).json({ message: 'Friend already exists' });
            } else {
                const friend = new FriendsList();
                friend.userID = req.body.userID;
                friend.friendID = req.body.friendID;
                friend.friendStatus = 'Pending';
                friend.friendSince = new Date().toISOString();
                friendsListRepository.save(friend).then((friend) => {
                    IonSocket.emit(`Alert${req.body.friendID}`, `You have a friend request from ${req.body.userID}`);
                    IonSocket.emit(`Alert${req.body.userID}`, `Friend request sent to ${req.body.friendID}`); 
                    return res.status(201).json(friend);
                }
                ).catch((error) => {
                    return res.status(400).json({ message: 'Error adding friend' });
                });
            }
        }).catch((error) => {
            return res.status(400).json({ message: 'Error adding friend' });
        }
            ,);
}