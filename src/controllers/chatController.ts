import { Request, Response } from 'express';
import { AppData } from '../server';
import { Chat } from '../entities/Chat';
import { FriendsList } from '../entities/FriendsList';
export const createChat = (req: Request, res: Response) => {
    const chatRepository = AppData.getRepository(Chat);
    const friendsListRepository = AppData.getRepository(FriendsList);
    friendsListRepository.query(`SELECT UserID, FriendID FROM FriendsList WHERE (UserID = ${req.body.chatMemberOne} AND FriendID = ${req.body.chatMemberTwo}) OR (UserID = ${req.body.chatMemberTwo} AND FriendID = ${req.body.chatMemberOne})`)
        .then((friends) => {
            if (friends.length != 0) {
                chatRepository.query(`SELECT * FROM Chat WHERE (chatMemberOne = ${req.body.chatMemberOne} AND chatMemberTwo = ${req.body.chatMemberTwo}) OR (chatMemberOne = ${req.body.chatMemberTwo} AND chatMemberTwo = ${req.body.chatMemberOne})`).then((previousChat) => {
                    if (previousChat.length != 0) {
                        return res.status(400).json({ message: 'Chat already exists' });
                    } else {
                        const chat = new Chat();
                        chat.chatStatus = req.body.chatStatus;
                        chat.chatMemberOne = req.body.chatMemberOne;
                        chat.chatMemberTwo = req.body.chatMemberTwo;
                        chat.chatCreated = new Date().toISOString();
                        chat.chatUpdated = new Date().toISOString();
                        chatRepository.save(chat).then((chat) => {
                            return res.status(201).json(chat);
                        }
                        ).catch((error) => {
                            return res.status(400).json({ message: 'Error creating chat' });
                        });
                    }
                })
                    .catch((error) => {
                        return res.status(400).json({ message: 'Error creating chat' });
                    });
            } else {
                return res.status(400).json({ message: 'These Users aint friends Broski' });

            }
        }).catch((error) => {
            return res.status(400).json({ message: 'Error creating chat' });
        }
            ,);
}
export const getUserChats = (req: Request, res: Response) => {
    const userID = req.query.userID;
    const chatRepository = AppData.getRepository(Chat);
    chatRepository.query(`SELECT * FROM Chat WHERE chatMemberOne = ${userID} OR chatMemberTwo = ${userID}`).then((chats) => {
        if (chats.length != 0) {
            return res.status(200).json(chats);
        } else {
            return res.status(404).json({ message: 'No chats found' });
        }
    }
    ).catch((error) => {
        res.status(404).json({ message: 'Error fetching user chats' });
    });
};
export const clearUserChat = (req: Request, res: Response) => {
    res.json({ message: 'User chat cleared' });
}
export const deleteUserChat = (req: Request, res: Response) => {
    res.json({ message: 'User chat deleted' });
}