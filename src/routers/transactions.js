import { Router } from "express";
import { UserValidator } from '../middlewares/user.js';
// transactionsRouter.use(UserValidator);

import { CartController, DeleteController, GetController } from '../controllers/transactions.js';

const transactionsRouter = Router();

transactionsRouter.post('/cart', CartController);
transactionsRouter.delete('/cart:ProductID', DeleteController);
transactionsRouter.get('/cart:userOwner', GetController);

export default transactionsRouter;