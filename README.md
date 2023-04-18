CHICK FIL AAAA

How it works:

landing/home page has locations, can be accessed without login or with login
if logged in, show avatar menu in top right, and navbar buttons for home, manage, and order
if not logged in, show login button top right, and navbar buttons for only home


SQL tables im gonna run eventually:

CREATE TABLE v3_ingredients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,

    threshold INT NOT NULL CHECK (threshold >= 0),
    quantity INT NOT NULL CHECK (quantity >= 0),

    enabled BOOL NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW();
    updated_at TIMESTAMP NOT NULL DEFAULT NOW();
);

CREATE TABLE v3_products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,

    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    quantity INT NOT NULL CHECK (quantity >= 0),

    enabled BOOL NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW();
    updated_at TIMESTAMP NOT NULL DEFAULT NOW();
);

CREATE TABLE v3_product_ingredients (
    product_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    ingredient_quantity INT NOT NULL,

    enabled BOOL NOT NULL,
);

CREATE TABLE v3_orders (
    id SERIAL PRIMARY KEY,

    server_id INT NOT NULL,

    total_price MONEY NOT NULL CHECK (price >= 0.00),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
);

CREATE TABLE v3_order_products (
    order_id INT NOT NULL,

    product_id INT NOT NULL,
    product_quantity INT NOT NULL,

    product_price MONEY NOT NULL CHECK (product_price >= 0.00),
    product_total_price MONEY NOT NULL CHECK (product_total_price >= 0.00), 
);

CREATE TABLE v3_users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    manager_permissions BOOL NOT NULL DEFAULT FALSE,
    server_permissions BOOL NOT NULL DEFAULT FALSE,
);

CREATE TABLE v3_constants (
    key TEXT NOT NULL,
    value TEXT NOT NULL,
);