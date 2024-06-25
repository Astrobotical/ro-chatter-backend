import { Router } from 'express';
import {addFriend} from '../controllers/friendController';
const router = Router();

//Friend Routing EndPoints
router.get('/', (req, res) => {
  res.send('Welcome to the friend route!');
}
);
router.post('/addFriend', addFriend);

export default router;