import db from '../database/database.js';
import mongodb from 'mongodb';

export async function AllProductsController(req, res) {

    try {

        const products = await db.collection('smartstore_products').find().toArray();
        products ? res.status(200).send(products) : res.status(200).send([]);

    } catch (err) { return res.status(500).send('Error accessing database during login.'); }
}

export async function NewProductController(req, res) {

    try {

        console.log(req.body);

        const {

            productName, productPrice, productDescription,
            productImage, productCategory, productQuantity,
            productStatus, productDate, productTime, productOwner } = req.body;

        await db.collection('smartstore_products').insertOne({

            productName, productPrice, productDescription,
            productImage, productCategory, productQuantity,
            productStatus, productDate, productTime, productOwner

        });

        res.sendStatus(201);

    } catch (err) { return res.status(500).send('Error accessing database during NewProductController.'); }

}


export async function GetProductController(req, res) {

    try {

        const { ID } = req.params;

        const product = await db.collection('smartstore_products').findOne({ _id: new mongodb.ObjectId(ID) });
        product ? res.status(200).send(product) : res.sendStatus(404);

    } catch (err) { return res.status(500).send('Error accessing database during GetProductController.'); }

}

export async function DeleteProductController(req, res) {

    try {

        const { ID } = req.params;

        const product = await db.collection('smartstore_products').findOne({ _id: new mongodb.ObjectId(ID) });
        if (!product) return res.sendStatus(404);

        await db.collection('smartstore_products').deleteOne({ _id: new mongodb.ObjectId(ID) });
        return res.sendStatus(200);

    } catch (err) { return res.status(500).send('Error accessing database during GetProductController.'); }

}

