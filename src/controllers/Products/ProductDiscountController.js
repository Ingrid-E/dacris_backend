const client = require("../../../database/keys")

module.exports = {
    product_discount_create_post : async function(req,res){
        const {product_id, discount_id} = req.body
        try {
            await client.query(
                `
                INSERT INTO products_discounts (fk_product_pd, fk_discount_pd)
                VALUES ($1, $2)
                `,
            [product_id, discount_id])
            return res.status(201).send("Product Discount Created")
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    product_discount_all_get : async function(req,res){
        try{
            const response = await client.query(
                `
                SELECT * FROM products_discounts
                `
            )
            return res.status(200).send(response.rows)
        }catch(error){
            console.error(error)
            return res.status(500).send("SERVER_ERROR")
        }
    },
    product_discount_get : async function(req,res){
        const {discount_id} = req.params
        try{
            const response = await client.query(
                `
                SELECT * FROM products_discounts WHERE fk_discount_pd = ${discount_id}
                `
            )
            if(response.rowCount < 1) return res.status(404).send({message: "DISCOUNT DOESNT EXISTS"})
            return res.status(200).send(response.rows[0])
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    product_discount_del: async function(req, res){
        const {product_discount_id} = req.params
        try{
            await client.query(
            `
            DELETE FROM products_discounts WHERE pk_product_discount = ${product_discount_id}
            `
            )
            return res.status(401).send({message: "Product Discount deleted"})
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    product_discount_update_put: async function(req,res){
        const {product_discount_id} = req.params
        try{
            const {product_id, discount_id} = req.body
            await client.query(
            `
            UPDATE products_discounts SET
            fk_product_pd = $1,
            fk_discount_pd = $2
            WHERE pk_product_discount = $3
            `,
            [product_id, discount_id,product_discount_id])
            return res.status(200).send({message: "Product Discount Updated"})
        }catch(error){
            console.error(error)
            return res.status(500).send("SERVER_ERROR")
        }
    }
}