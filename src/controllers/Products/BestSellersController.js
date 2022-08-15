const client = require("../../../database/keys")

module.exports = {
    bestsellers_create_post : async function(req,res){
        const {product_id} = req.body
        try {
            await client.query(
                `
                INSERT INTO bestSellers (fk_product_bestseller)
                VALUES ($1)
                `,
            [product_id])
            return res.status(201).send({ success: true})
        }catch(error){
            return res.status(500).send({ success: false})
        }
    },
    bestsellers_pagination_get: async function(req, res){
        return res.status(202).send({products: res.products, length: res.length})
    },
    bestsellers_all_get : async function(req,res){
        try{
            const response = await client.query(
                `
                SELECT * FROM bestSellers
                `
            )
            return res.status(200).send({success: true, products: response.rows})
        }catch(error){
            return res.status(500).send({ success: false})
        }
    },
    bestsellers_get : async function(req,res){
        const {product_id} = req.params
        try{
            const response = await client.query(
                `
                SELECT * FROM bestSellers WHERE fk_product_bestseller = ${product_id}
                `
            )
            if(response.rowCount < 1) return res.status(404).json({success: false})
            return res.status(200).json({success: true, product: response.rows})
        }catch(error){
            return res.status(500).json({success: false})
        }
    },
    bestsellers_del: async function(req, res){
        const {product_id} = req.params
        try{
            await client.query(
            `
            DELETE FROM bestSellers WHERE fk_product_bestseller = ${product_id}
            `
            )
            return res.status(200).json({success: true})
        }catch(error){
            return res.status(500).json({success: false})
        }
    }
}