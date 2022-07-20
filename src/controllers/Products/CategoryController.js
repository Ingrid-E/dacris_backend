const client = require("../../../database/keys")
module.exports = {
    category_create_post : async function(req,res){
        const {name, gender} = req.body
        try {
            await client.query(
                `
                INSERT INTO categories (name, gender)
                VALUES ($1, $2)
                `,
            [name, gender])
            return res.status(201).send("CATEGORY CREATED")
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    category_all_get : async function(req,res){
        try{
            const response = await client.query(
                `
                SELECT * FROM categories
                `
            )
            return res.status(200).send(response.rows)
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    category_get : async function(req,res){
        const {category_id} = req.params
        try{
            const response = await client.query(
                `
                SELECT * FROM categories WHERE pk_category = ${category_id}
                `
            )
            if(response.rowCount < 1) return res.status(404).send({message: "CATEGORY DOESNT EXISTS"})
            return res.status(200).send(response.rows[0])
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    category_del: async function(req, res){
        const {category_id} = req.params
        try{
            await client.query(
            `
            DELETE FROM categories WHERE pk_category = ${category_id}
            `
            )
            return res.status(401).send({message: "Category deleted"})
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    category_update_put: async function(req,res){
        const {category_id} = req.params
        try{
            const {name, gender} = req.body
            await client.query(
            `
            UPDATE categories SET
            name = $1,
            gender = $2
            WHERE pk_category = $3
            `,
            [name, gender, category_id])
            return res.status(200).send({message: "Category Updated"})
        }catch(error){
            console.error(error)
            return res.status(500).send("SERVER_ERROR")
        }
    }


}