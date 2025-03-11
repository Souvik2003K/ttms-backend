import { Router } from 'express';
import { createMessage, getMessages} from '../controller/chatController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/createMessage').post(requireSignIn,createMessage);
router.route('/').get(requireSignIn,getMessages);

export default router;