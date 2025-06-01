import express from 'express';
import { createPaymentSession } from '../Controllers/payment.js';
import auth from '../DBConn/Auth/auth.js';

const router = express.Router();

router.post('/create-session',auth, createPaymentSession);

export default router;