import { Router } from 'express';

import { AllProductsController, NewProductController, GetProductController, DeleteProductController } from '../controllers/products.js';
import { NewProductMiddleware } from '../middlewares/products.js';

const productsRouter = Router();

productsRouter.get('/allproducts', AllProductsController);
productsRouter.post('/newproduct', NewProductMiddleware, NewProductController);
productsRouter.get('/product:ID', GetProductController);
productsRouter.delete('/product:ID', DeleteProductController);

export default productsRouter;