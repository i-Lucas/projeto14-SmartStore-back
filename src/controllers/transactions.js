import db from '../database/database.js';
import mongodb from 'mongodb';

export async function CartController(req, res) {

    const { ProductID, userBuyer } = req.body;

    try {

        const product = await db.collection('smartstore_products').findOne({ _id: new mongodb.ObjectId(ProductID) });
        if (!product) return res.sendStatus(404);

        const cartProduct = await db.collection('smartstore_cart').findOne({ _id: new mongodb.ObjectId(ProductID) });
        if (cartProduct) return res.status(409).send('Product already in cart.');

        const productBuyer = { ...product, productBuyer: userBuyer };
        await db.collection('smartstore_cart').insertOne(productBuyer);
        res.status(201).send('Product added to cart.');

    } catch (err) { return res.status(500).send('Error accessing database during CartController.'); }
}

export async function DeleteController(req, res) {

    const { ProductID } = req.params;

    try {
        
        const product = await db.collection('smartstore_products').findOne({ _id: new mongodb.ObjectId(ProductID) });
        if (!product) return res.sendStatus(404);

        const cartProduct = await db.collection('smartstore_cart').findOne({ _id: new mongodb.ObjectId(ProductID) });
        if (!cartProduct) return res.status(409).send('Product not in cart.');


        await db.collection('smartstore_cart').deleteOne({ _id: new mongodb.ObjectId(ProductID) });
        res.status(200).send('Product deleted from cart.');

    } catch (err) { return res.status(500).send('Error accessing database during DeleteController.'); }
}

export async function GetController(req, res) {

    console.log("GetController")
    const { userOwner } = req.params;

    try {

        const products = await db.collection('smartstore_cart').find({ productBuyer: userOwner }).toArray();
        products ? res.status(200).send(products) : res.status(404).send([])

    } catch (err) { return res.status(500).send('Error accessing database during GetController.'); }

}