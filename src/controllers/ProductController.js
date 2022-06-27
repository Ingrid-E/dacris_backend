const client = require("../../database/keys")


module.exports = {
    product_create_post : async function(req,res){
        const {name, description, price, size, id_category} = req.body
        try {
            const response = await client.query(
                `
                INSERT INTO products (name, description, price, size, fk_category_product)
                VALUES ($1, $2, $3, $4, $5) RETURNING pk_product
                `,
            [name, description, price, size, id_category])
            return res.status(201).send({message: "Product Created", product_id: response.rows[0].pk_product})
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    product_get : async function(req,res){
        const {product_id} = req.params

        try {
            const response = await client.query(
                `
                SELECT * FROM products WHERE pk_product = ${product_id}
                `
            )
            if(response.rowCount < 1) return res.status(404).send({message: "PRODUCT DOESNT EXISTS"})
            return res.status(200).send(response.rows[0])
        }catch(error){
            console.log(error)
            return res.status(500).send("SERVER_ERROR")
        }
    },
    product_all_get: async function(req, res){
        try{
            const response = await client.query(
                `
                SELECT * FROM products
                `
            )
            return res.status(200).send(response.rows)
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    product_del: async function(req, res){
        try{
            const {product_id} = req.params
            await client.query(
            `
            DELETE FROM products WHERE pk_product = ${product_id}
            `
            )
            return res.status(401).send({message: "Product deleted"})
        }catch(error){
            if(error.status == 400){
                return res.status(404).send({message: "Product not found"})
            }else{
                return res.status(500).send("SERVER_ERROR")
            }

        }
    },
    product_update_put: async function(req,res){
        try{
            const {product_id} = req.params
            const {name, description, price, store, available, category_id, size} = req.body
            await client.query(
            `
            UPDATE products SET
            name = $1,
            description = $2,
            price = $3,
            in_store = $4,
            available = $5,
            fk_category_product = $6,
            size = $7
            WHERE pk_product = $8
            `,
            [name, description, price, store, available, category_id, size, product_id])
            return res.status(200).send({message: "Product Updated"})
        }catch(error){
            console.error(error)
            return res.status(500).send("SERVER_ERROR")
        }
    }

}