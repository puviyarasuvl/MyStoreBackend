CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT4 NOT NULL,
    category VARCHAR(100),
    description VARCHAR(500),
    url VARCHAR(500)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(100),
    status VARCHAR(10),
    total FLOAT4 NOT NULL DEFAULT 0,
    createdDate VARCHAR(50) NOT NULL
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    orderId INTEGER REFERENCES orders(id),
    productId INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1
);