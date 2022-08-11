const client = require("../../../database/keys")

module.exports = {
    image_create_post : async function(req,res){
        console.log("Image posting")
        const {product_id, position, url} = req.body
        console.log(product_id, position, url)
        try {
            await client.query(
                `
                INSERT INTO images (fk_product_images, position, url)
                VALUES ($1, $2, $3)
                `,
            [product_id, position, url])
            return res.status(201).send({ success: true})
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    image_all_get : async function(req,res){
        try{
            const response = await client.query(
                `
                SELECT * FROM images
                `
            )
            return res.status(200).send(response.rows)
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    image_get : async function(req,res){
        const {product_id} = req.params
        try{
            const response = await client.query(
                `
                SELECT * FROM images WHERE fk_product_images = ${product_id}
                `
            )
            if(response.rowCount < 1) return res.status(404).json({success: false})
            return res.status(200).json({success: true, images: response.rows})
        }catch(error){
            return res.status(500).json({success: false})
        }
    },
    image_del: async function(req, res){
        const {image_id} = req.params
        try{
            await client.query(
            `
            DELETE FROM images WHERE pk_image = ${image_id}
            `
            )
            return res.status(401).send({message: "Image deleted"})
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    image_update_put: async function(req,res){
        const {image_id} = req.params
        try{
            const {product_id, position, url} = req.body
            await client.query(
            `
            UPDATE categories SET
            fk_product_images = $1,
            position = $2,
            url = $3
            WHERE pk_category = $4
            `,
            [product_id, position,url, image_id])
            return res.status(200).send({message: "Image Updated"})
        }catch(error){
            console.error(error)
            return res.status(500).send("SERVER_ERROR")
        }
    }
}