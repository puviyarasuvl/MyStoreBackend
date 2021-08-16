"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}
var app = express_1.default();
var port = 3000;
// Enable cors for all origins and routes
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', index_1.default);
app.listen(port, function () {
    console.log("Server started successfully at " + port);
});
exports.default = app;
