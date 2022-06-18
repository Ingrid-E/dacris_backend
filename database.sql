CREATE DATABASE products_microservice;

CREATE TYPE product_gender AS ENUM ('F', 'M');
CREATE TYPE product_size AS ENUM('S', 'M', 'L');

CREATE TABLE categories(
    pk_category INT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    gender product_gender,
    size product_size
);

CREATE TABLE products(
    pk_product INT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT NULL,
    price NUMERIC(12,2),
    in_store BOOLEAN NOT NULL DEFAULT FALSE,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_category_product
        FOREIGN KEY(fk_category_product)
            REFERENCES categories
);

CREATE TABLE images(
    pk_images INT PRIMARY KEY NOT NULL,
    position SMALLINT NOT NULL DEFAULT 1,
    url TEXT NOT NULL,
);

CREATE TABLE discounts(
    pk_discount INT PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    percentage NUMERIC(5,2),
    start_date DATE NULL,
    end_date DATE NULL
);

CREATE TABLE products_discounts(
    pk_product_discount INT PRIMARY KEY NOT NULL,
    CONSTRAINT fk_product_pd
        FOREIGN KEY(fk_product_pd)
            REFERENCES products
    CONSTRAINT fk_discount_pd
        FOREIGN KEY(fk_discount_pd)
            REFERENCES discounts
);
