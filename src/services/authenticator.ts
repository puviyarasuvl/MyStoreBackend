import jwt from 'express-jwt';
import jwtAuthz from 'express-jwt-authz';
import jwksRsa from 'jwks-rsa';

const checkJwt = jwt({
    // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: [`https://${process.env.AUTH0_DOMAIN}/`],
    algorithms: ['RS256'],
});

const checkPermissions = (permissions: string) => {
    return jwtAuthz([permissions], {
        customScopeKey: 'permissions',
        checkAllScopes: true,
        failWithError: true,
    });
};

export { checkJwt, checkPermissions };
