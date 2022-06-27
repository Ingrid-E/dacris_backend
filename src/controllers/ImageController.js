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
        const {image_id} = req.params
        try{
            const response = await client.query(
                `
                SELECT * FROM images WHERE pk_image = ${image_id}
                `
            )
            if(response.rowCount < 1) return res.status(404).send({message: "IMAGE DOESNT EXISTS"})
            return res.status(200).send(response.rows[0])
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
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