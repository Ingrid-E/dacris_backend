const client = require("../../../database/keys")

module.exports = {
    newproduct_create_post : async function(req,res){
        const {product_id} = req.body
        try {
            await client.query(
                `
                INSERT INTO newProducts (fk_product_new)
                VALUES ($1)
                `,
            [product_id])
            return res.status(201).send({ success: true})
        }catch(error){
            return res.status(500).send({ success: false})
        }
    },
    newproduct_all_get : async function(req,res){
        try{
            const response = await client.query(
                `
                SELECT * FROM newProducts
                `
            )
            return res.status(200).send({success: true, products: response.rows})
        }catch(error){
            return res.status(500).send({ success: false})
        }
    },
    newproduct_get : async function(req,res){
        const {product_id} = req.params
        try{
            const response = await client.query(
                `
                SELECT * FROM newProducts WHERE fk_product_new = ${product_id}
                `
            )
            if(response.rowCount < 1) return res.status(404).json({success: false})
            return res.status(200).json({success: true, product: response.rows})
        }catch(error){
            return res.status(500).json({success: false})
        }
    },
    newproduct_del: async function(req, res){
        const {product_id} = req.params
        try{
            await client.query(
            `
            DELETE FROM newProducts WHERE fk_product_new = ${product_id}
            `
            )
            return res.status(200).json({success: true})
        }catch(error){
            return res.status(500).json({success: false})
        }
    }
}