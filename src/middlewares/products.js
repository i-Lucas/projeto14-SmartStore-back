import { NewProductSchema } from '../schemas/products.js';

export function NewProductMiddleware(req, res, next) {

    const { productName, productPrice, productDescription } = req.body;
    const { error } = NewProductSchema.validate({ productName, productPrice, productDescription }, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));

    next();
}