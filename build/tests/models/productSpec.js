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
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../../models/product");
var productModel = new product_1.ProductModel();
var book = {
    id: 1,
    name: 'Book',
    price: 9.99,
    category: 'Readings',
    description: 'You can read it!',
    url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
};
var headphone = {
    id: 2,
    name: 'Headphones',
    price: 249.99,
    category: 'Mobile Accessories',
    description: 'Listen to stuff!',
    url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
};
var backpack = {
    id: 3,
    name: 'Backpack',
    price: 79.99,
    category: 'Travel',
    description: 'Carry things around town!',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
};
describe('Testing Product Model', function () {
    describe('create method', function () {
        it('should successfully add the product to database and return the added product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.create(book)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(book);
                        return [4 /*yield*/, productModel.create(headphone)];
                    case 2:
                        result = _a.sent();
                        expect(result).toEqual(headphone);
                        return [4 /*yield*/, productModel.create(backpack)];
                    case 3:
                        result = _a.sent();
                        expect(result).toEqual(backpack);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('index method', function () {
        it('should return all availale products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.index()];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toEqual(3);
                        expect(result).toEqual([book, headphone, backpack]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('show method', function () {
        it('should return the product details based on the given id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.show(1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(book);
                        return [4 /*yield*/, productModel.show(2)];
                    case 2:
                        result = _a.sent();
                        expect(result).toEqual(headphone);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return nothing if invalid product is passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.show(12)];
                    case 1:
                        result = _a.sent();
                        expect(result).toBeUndefined;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('delete method', function () {
        it('should successfully delete the product from db', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, result1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.delete(1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(1);
                        return [4 /*yield*/, productModel.index()];
                    case 2:
                        result1 = _a.sent();
                        expect(result1.length).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 0 as row count if invalid product id passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.delete(10)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('productsByCategory', function () {
        it('should return the products for given category', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.productsByCategory('Travel')];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toEqual(1);
                        expect(result[0]).toEqual(backpack);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
