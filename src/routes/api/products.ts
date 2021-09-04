import express from 'express';
import { Product, ProductModel } from '../../models/product';
import { checkJwt, checkPermissions } from '../../services/authenticator';

const productRouter = express.Router();

const productModel = new ProductModel();

const create = async (req: express.Request, res: express.Response) => {
    const newProduct: Product = {
        name: req.body.productName,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        url: req.body.url,
    };

    try {
        const result = await productModel.create(newProduct);
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const index = async (_req: express.Request, res: express.Response) => {
    try {
        const result = await productModel.index();
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const show = async (req: express.Request, res: express.Response) => {
    try {
        const result = await productModel.show(parseInt(req.params.productId));
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
        const result = await productModel.delete(
            parseInt(req.params.productId)
        );

        if (result) {
            res.sendStatus(204);
        }
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const productsByCategory = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const result = await productModel.productsByCategory(
            req.params.category
        );
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

productRouter.post(
    '/addProduct',
    checkJwt,
    checkPermissions('add:product'),
    (req, res) => {
        create(req, res);
    }
);

productRouter.get('/getProduct', (req, res) => {
    index(req, res);
});

productRouter.get('/getProduct/:productId', (req, res) => {
    show(req, res);
});

productRouter.delete(
    '/deleteProduct/:productId',
    checkJwt,
    checkPermissions('delete:product'),
    (req, res) => {
        deleteProduct(req, res);
    }
);

productRouter.get('/category/:category', (req, res) => {
    productsByCategory(req, res);
});

export default productRouter;
