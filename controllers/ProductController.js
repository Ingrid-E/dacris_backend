const client = require("../database/keys")

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
    product_get : function(req,res){
        res.send("Hola mundo")
    }
}

