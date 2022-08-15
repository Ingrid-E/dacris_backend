const client = require("../../database/keys")

module.exports = {
    //hELLO
    productPagination: () => {
        return async (req, res, next) => {
            try {
                const { page, limit } = req.query
                //const length = await client.query(`SELECT COUNT(*) FROM products`)
                //If page =1, limit = 5 then startIndex = (1-1)*5 = 0
                const startIndex = (page - 1) * limit
                //endIndex = 1*5 = 5
                const response = await client.query(`SELECT * FROM products ORDER BY pk_product LIMIT ${limit} OFFSET ${startIndex}`)
                res.products = response.rows
                next()

            } catch (err) {
                console.log(err)
            }
        }
    },
    product_filterPagination: () => {
        
        return async (req, res, next) => {
            console.log("PRODUCT PAGINATION")
            let { page, limit, filter } = req.query
            const startIndex = (page - 1) * limit
            try {
                var response, length
                if (filter === undefined || filter === '') {
                    length = await client.query(`SELECT COUNT(*) FROM products`)
                    response = await client.query(`SELECT * FROM products ORDER BY pk_product LIMIT $1 OFFSET $2`, [limit, startIndex])
                } else {
                    filter = "'"+filter + "%'"
                    length = await client.query(`SELECT COUNT(*) FROM products WHERE name ILIKE ${filter}`)
                    response = await client.query(`SELECT * FROM products WHERE name ILIKE ${filter} ORDER BY pk_product LIMIT $1 OFFSET $2`, [ limit, startIndex])
                }

                res.length = length.rows[0]
                res.products = response.rows
                console.log(res.length)
                next()
            } catch (err) {
                console.log(err)
            }
        }
    },

    bestSellers_filterPagination: () => {
        
        return async (req, res, next) => {
            console.log("BESTSELLERS")
            let { page, limit, filter } = req.query
            const startIndex = (page - 1) * limit
            try {
                var response, length
                if (filter === undefined || filter === '') {
                    length = await client.query(`SELECT COUNT(*) FROM bestSellers`)
                    response = await client.query(`SELECT * FROM bestSellers ORDER BY pk_bestseller LIMIT $1 OFFSET $2`, [limit, startIndex])
                } else {
                    filter = "'"+filter + "%'"
                    length = await client.query(`SELECT COUNT(*) FROM bestSellers WHERE name ILIKE ${filter}`)
                    response = await client.query(`SELECT * FROM bestSellers WHERE name ILIKE ${filter} ORDER BY pk_bestseller LIMIT $1 OFFSET $2`, [limit, startIndex])
                }
                console.log(response)
                res.length = length.rows[0]
                res.products = response.rows
                next()
            } catch (err) {
                console.log(err)
            }
        }
    }
}
