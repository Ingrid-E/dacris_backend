const client = require("../../database/keys")

module.exports = {
    //hELLO
    productPagination: () => {
        console.log("PAGINATION")
        return async (req, res, next) => {
            try {
                console.log('PAGINATION')
                const { page, limit } = req.query
                //const length = await client.query(`SELECT COUNT(*) FROM products`)
                //If page =1, limit = 5 then startIndex = (1-1)*5 = 0
                const startIndex = (page - 1) * limit
                //endIndex = 1*5 = 5
                console.log("Params ", limit, startIndex)
                const response = await client.query(`SELECT * FROM products ORDER BY pk_product LIMIT ${limit} OFFSET ${startIndex}`)
                res.products = response.rows
                next()

            } catch (err) {
                console.log(err)
            }
        }
    },
    filterPagination: () => {
        console.log("PAGINATION")
        return async (req, res, next) => {
            const { page, limit, filter } = req.query
            //const length = await client.query(`SELECT COUNT(*) FROM products`)
            //If page =1, limit = 5 then startIndex = (1-1)*5 = 0
            const startIndex = (page - 1) * limit
            //endIndex = 1*5 = 5
            let query = ''
            if (filter === undefined || filter === '') {
                query = `SELECT * FROM products ORDER BY pk_product LIMIT ${limit} OFFSET ${startIndex}`
            } else {
                query = `SELECT * FROM products WHERE name ilike %${filter}% ORDER BY pk_product LIMIT ${limit} OFFSET ${startIndex}`
            }
            console.log(query)
            try {
                const response = await client.query(query)
                res.products = response.rows
                next()
            } catch (err) {
                console.log(err)
            }
        }
    }
}
