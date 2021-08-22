import express from 'express';

import { OrderModel } from '../../models/order';
import { checkJwt } from '../../services/authenticator';

const orderRouter = express.Router();

const orderModel = new OrderModel();

const index = async (req: express.Request, res: express.Response) => {
    try {
        const result = await orderModel.index(req.body.userId);
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const show = async (req: express.Request, res: express.Response) => {
    try {
        const result = await orderModel.show(parseInt(req.params.orderId));
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const updateStaus = async (req: express.Request, res: express.Response) => {
    try {
        const result = await orderModel.update(
            parseInt(req.body.orderId),
            req.body.status
        );
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const addProduct = async (req: express.Request, res: express.Response) => {
    try {
        const result = await orderModel.addProduct(
            parseInt(req.body.productId),
            parseInt(req.body.quantity),
            req.body.userId
        );

        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

orderRouter.get('/', checkJwt, (req, res) => {
    index(req, res);
});

orderRouter.get('/:orderId', checkJwt, (req, res) => {
    show(req, res);
});

orderRouter.patch('/', checkJwt, (req, res) => {
    updateStaus(req, res);
});

orderRouter.post('/addProduct', checkJwt, (req, res) => {
    addProduct(req, res);
});

export default orderRouter;
