const client = require("../database/keys")

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
    category_get : function(req,res){
        res.send("Hola mundo")
    }
}