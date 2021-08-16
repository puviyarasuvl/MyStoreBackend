"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkScopes = exports.checkJwt = void 0;
var express_jwt_1 = __importDefault(require("express-jwt"));
var express_jwt_authz_1 = __importDefault(require("express-jwt-authz"));
var jwks_rsa_1 = __importDefault(require("jwks-rsa"));
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
    issuer: ["https://" + process.env.AUTH0_DOMAIN + "/"],
    algorithms: ['RS256'],
});
exports.checkJwt = checkJwt;
var checkScopes = express_jwt_authz_1.default(['add:products']);
exports.checkScopes = checkScopes;
