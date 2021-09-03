"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../../index"));
var axios_1 = __importDefault(require("axios"));
var request = supertest_1.default(index_1.default);
var customerAuthToken;
var adminAuthToken;
describe('Testing products route', function () {
    it('[post] /api/products should return 401 for request without token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/api/products')
                        .type('form')
                        .send({
                        productName: 'Book',
                        price: 9.99,
                        category: 'Readings',
                        description: 'You can read it!',
                        url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    })
                        .set('Authorization', "Bearer " + adminAuthToken)
                        .expect(401)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('[post] /api/products should allow admin to add new products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default({
                        method: 'POST',
                        url: 'https://my-store-app.us.auth0.com/oauth/token',
                        headers: { 'content-type': 'application/json' },
                        data: {
                            grant_type: 'client_credentials',
                            client_id: process.env.AUTH0_TEST_CLIENT_ID2,
                            client_secret: process.env.AUTH0_TEST_CLIENT_SECRET2,
                            audience: process.env.AUTH0_AUDIENCE,
                        },
                    })];
                case 1:
                    res = _a.sent();
                    adminAuthToken = res.data.access_token;
                    return [4 /*yield*/, request
                            .post('/api/products')
                            .type('form')
                            .send({
                            productName: 'Book',
                            price: 9.99,
                            category: 'Readings',
                            description: 'You can read it!',
                            url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                        })
                            .set('Authorization', "Bearer " + adminAuthToken)
                            .expect(200)];
                case 2:
                    response = _a.sent();
                    expect(response.body.name).toEqual('Book');
                    return [2 /*return*/];
            }
        });
    }); });
    it('[post] /api/products should not allow customer to add new products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default({
                        method: 'POST',
                        url: 'https://my-store-app.us.auth0.com/oauth/token',
                        headers: { 'content-type': 'application/json' },
                        data: {
                            grant_type: 'client_credentials',
                            client_id: process.env.AUTH0_TEST_CLIENT_ID1,
                            client_secret: process.env.AUTH0_TEST_CLIENT_SECRET1,
                            audience: process.env.AUTH0_AUDIENCE,
                        },
                    })];
                case 1:
                    res = _a.sent();
                    customerAuthToken = res.data.access_token;
                    return [4 /*yield*/, request
                            .post('/api/products')
                            .type('form')
                            .send({
                            productName: 'Book',
                            price: 9.99,
                            category: 'Readings',
                            description: 'You can read it!',
                            url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                        })
                            .set('Authorization', "Bearer " + customerAuthToken)
                            .expect(403)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('[get] /api/products should return all available products information', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/products/getProduct')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual([
                        {
                            id: 2,
                            name: 'Headphones',
                            price: 249.99,
                            category: 'Mobile Accessories',
                            description: 'Listen to stuff!',
                            url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                        },
                        {
                            id: 3,
                            name: 'Backpack',
                            price: 79.99,
                            category: 'Travel',
                            description: 'Carry things around town!',
                            url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                        },
                        {
                            id: 4,
                            name: 'Book',
                            price: 9.99,
                            category: 'Readings',
                            description: 'You can read it!',
                            url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('[get] /api/products/4 should return product information for given id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/products/getProduct/4')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({
                        id: 4,
                        name: 'Book',
                        price: 9.99,
                        category: 'Readings',
                        description: 'You can read it!',
                        url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('[delete] /api/products/ should allow admin to delete a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete('/api/products')
                        .type('form')
                        .send({
                        productId: 4,
                    })
                        .set('Authorization', "Bearer " + adminAuthToken)
                        .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.text).toEqual('Product deleted successfully');
                    return [2 /*return*/];
            }
        });
    }); });
    it('[delete] /api/products/ should not allow customer to delete a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete('/api/products')
                        .type('form')
                        .send({
                        productId: 3,
                    })
                        .set('Authorization', "Bearer " + customerAuthToken)
                        .expect(403)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('[get] /api/products/category/Mobiles should return the products in the give category', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/products/category/Travel')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual([
                        {
                            id: 3,
                            name: 'Backpack',
                            price: 79.99,
                            category: 'Travel',
                            description: 'Carry things around town!',
                            url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
});
