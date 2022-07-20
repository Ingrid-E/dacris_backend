CREATE TYPE product_gender AS ENUM ('F', 'M');
CREATE TYPE product_size AS ENUM('S', 'M', 'L', 'U');

CREATE TABLE categories(
    pk_category SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    gender product_gender
);

CREATE TABLE products(
    pk_product SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NULL,
    price NUMERIC(12,2),
    size product_size NOT NULL,
    in_store BOOLEAN NOT NULL DEFAULT FALSE,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    fk_category_product INT,
    CONSTRAINT fk_category_product
        FOREIGN KEY(fk_category_product)
            REFERENCES categories(pk_category)
);

CREATE TABLE users(
    pk_user SERIAL PRIMARY KEY,
    firstname VARCHAR(60) NOT NULL,
    lastname VARCHAR(60) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(250) NOT NULL,
    lastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    refresh_token VARCHAR(500) NULL
);

CREATE TABLE images(
    pk_image SERIAL PRIMARY KEY,
    fk_product_images INT,
    position SMALLINT NOT NULL DEFAULT 1,
    url TEXT NOT NULL,
    CONSTRAINT fk_product_images
        FOREIGN KEY(fk_product_images)
            REFERENCES products(pk_product)
);

CREATE TABLE discounts(
    pk_discount SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    percentage NUMERIC(5,2),
    start_date DATE NULL,
    end_date DATE NULL
);

CREATE TABLE products_discounts(
    pk_product_discount SERIAL PRIMARY KEY,
    fk_product_pd INT NOT NULL,
    fk_discount_pd INT NOT NULL,
    CONSTRAINT fk_product_pd
        FOREIGN KEY(fk_product_pd)
            REFERENCES products(pk_product),
    CONSTRAINT fk_discount_pd
        FOREIGN KEY (fk_discount_pd)
            REFERENCES discounts (pk_discount)
);
