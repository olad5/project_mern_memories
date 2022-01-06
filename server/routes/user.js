
import express from 'express';

import {signin, signup} from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);// A Post route because you need to send data to the backend
router.post('/signup', signup);// A Post route because you need to send data to the backend

export default router;
