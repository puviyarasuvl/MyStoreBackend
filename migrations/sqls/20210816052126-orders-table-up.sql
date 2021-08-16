CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(100),
    status VARCHAR(10),
    total FLOAT4 NOT NULL DEFAULT 0,
    createdDate VARCHAR(50) NOT NULL
);