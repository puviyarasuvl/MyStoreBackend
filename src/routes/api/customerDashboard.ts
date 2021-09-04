import express from 'express';
import { checkJwt } from '../../services/authenticator';
import { CustomerDashboard } from '../../services/customerDashboard';

const dashboardRouter = express.Router();

const customerDashboard = new CustomerDashboard();

const currentOrder = async (req: express.Request, res: express.Response) => {
    try {
        const result = await customerDashboard.currentOrder(
            req.query.userID as string
        );
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const completedOrders = async (req: express.Request, res: express.Response) => {
    try {
        const result = await customerDashboard.completedOrders(req.body.userId);
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

dashboardRouter.get('/cart', checkJwt, (req, res) => {
    currentOrder(req, res);
});

dashboardRouter.get('/orders', checkJwt, (req, res) => {
    completedOrders(req, res);
});

export default dashboardRouter;
