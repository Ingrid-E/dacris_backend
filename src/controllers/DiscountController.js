const client = require("../../database/keys")
module.exports = {
    discount_create_post : async function(req,res){
        const {name, percentage, start_date, end_date} = req.body
        try {
            await client.query(
                `
                INSERT INTO discounts (name, percentage, start_date, end_date)
                VALUES ($1, $2, $3, $4)
                `,
            [name, percentage, start_date, end_date])
            return res.status(201).send("DISCOUNT CREATED")
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    discount_all_get : async function(req,res){
        try{
            const response = await client.query(
                `
                SELECT * FROM discounts
                `
            )
            return res.status(200).send(response.rows)
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    discount_get : async function(req,res){
        const {discount_id} = req.params
        try{
            const response = await client.query(
                `
                SELECT * FROM discounts WHERE pk_discount = ${discount_id}
                `
            )
            if(response.rowCount < 1) return res.status(404).send({message: "DISCOUNT DOESNT EXISTS"})
            return res.status(200).send(response.rows[0])
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    discount_del: async function(req, res){
        const {discount_id} = req.params
        try{
            await client.query(
            `
            DELETE FROM discounts WHERE pk_discount = ${discount_id}
            `
            )
            return res.status(401).send({message: "Discount deleted"})
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    discount_update_put: async function(req,res){
        const {discount_id} = req.params
        try{
            const {name, percentage, start_date, end_date} = req.body
            await client.query(
            `
            UPDATE discounts SET
            name = $1,
            percentage = $2,
            start_date = $3,
            end_date = $4
            WHERE pk_discount = $5
            `,
            [name, percentage, start_date, end_date, discount_id])
            return res.status(200).send({message: "Discount Updated"})
        }catch(error){
            console.error(error)
            return res.status(500).send("SERVER_ERROR")
        }
    }


}