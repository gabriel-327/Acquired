import express from 'express';
import { sendmessage, receivemessage, markread } from '../controllers/message.controller';

const router = express.Router();

router.post('/', sendmessage);


router.get('/', receivemessage);

router.put('/read', markread);

export default router;


