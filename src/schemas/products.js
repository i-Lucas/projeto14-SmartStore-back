import joi from 'joi';

export const NewProductSchema = joi.object({

    productName: joi.string().min(5).max(25).required(),
    productPrice: joi.number().required(),
    productDescription: joi.string().min(5).required()
});