const client = require("../../database/keys")

module.exports = {
    image_create_post : async function(req,res){
        const {product_id, position, url} = req.body
        try {
            await client.query(
                `
                INSERT INTO images (fk_product_images, position, url)
                VALUES ($1, $2, $3)
                `,
            [product_id, position, url])
            return res.status(201).send("Image Created")
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    image_get : function(req,res){
        res.send("Hola mundo")
    }
}