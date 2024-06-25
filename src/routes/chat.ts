// routes/chat.js
import { Router } from 'express';
import {getUserChats,clearUserChat,deleteUserChat} from '../controllers/chatController';

const router = Router();
//Chat Routing EndPoints
router.get('/', (req, res) => {
  res.send('Welcome to the chat route!');
}
);
router.get('/userChat', getUserChats);
router.post('createChat', );
router.delete('/deleteChat', deleteUserChat);
router.post('/clearChat', clearUserChat);
  
export default router;