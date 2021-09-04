"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermissions = exports.checkJwt = void 0;
var express_jwt_1 = __importDefault(require("express-jwt"));
var express_jwt_authz_1 = __importDefault(require("express-jwt-authz"));
var jwks_rsa_1 = __importDefault(require("jwks-rsa"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var checkJwt = express_jwt_1.default({
    // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://" + process.env.AUTH0_DOMAIN + "/.well-known/jwks.json",
    }),
    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: "https://" + process.env.AUTH0_DOMAIN + "/",
    algorithms: ['RS256'],
});
exports.checkJwt = checkJwt;
var checkPermissions = function (permissions) {
    return express_jwt_authz_1.default([permissions], {
        customScopeKey: 'permissions',
        checkAllScopes: true,
        failWithError: true,
    });
};
exports.checkPermissions = checkPermissions;
