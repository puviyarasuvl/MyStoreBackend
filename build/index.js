"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}
var app = express_1.default();
var port = 3000;
app.use(helmet_1.default());
app.use(cors_1.default({ origin: process.env.CLIENT_ORIGIN_URL }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
var rootCas = require('ssl-root-cas').create();
require('https').globalAgent.options.ca = rootCas;
app.use('/api', index_1.default);
app.listen(port, function () {
    console.log("Server started successfully at " + port);
});
exports.default = app;
