const client = require("../../database/keys")
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authJwt = require('../middleware/authJwt')
const { generate_access_token } = require("../middleware/authJwt")
require('dotenv').config()

module.exports = {
    user_join_post : async function(req,res){
        try {
            const {email,password} = req.body;
            const response = await client.query("SELECT password FROM users WHERE email=$1", [email]);

            if(response.rowCount === 0){
                return res.status(404).json({success:false});
            }

            if(await bycrypt.compare(password, response.rows[0].password)){
                return res.status(200).json({success:true});
            }else{
                return res.status(403).json({success:false});
            }
            
            } catch (error) {
                return res.status(500).json({success:false});
            }
    },
    user_create_post : async function(req,res){
        const {firstname, lastname, email, password} = req.body
        try {
            const salt = await bycrypt.genSalt();
            const hashedPassword = await bycrypt.hash(password, salt)
            await client.query(
                `
                INSERT INTO users (firstname, lastname, email, password)
                VALUES($1,$2, $3, $4)
                `,
                [firstname, lastname, email, hashedPassword]
            )
            return res.status(201).send("USER CREATED")
        }catch(error){
            return res.status(500).send("SERVER_ERROR")
        }
    },
    user_login_post : async function(req,res){
        const {email, password} = req.body
        try {
            const response = await client.query(
                `
                SELECT email, password FROM users
                WHERE email = $1
                `,
                [email]
            )
            
            if(await bycrypt.compare(password, response.rows[0].password)){
                const user  = {email: email, password: response.rows[0].password}
                const accessToken = authJwt.generate_access_token(user)
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                const salt = await bycrypt.genSalt();
                const hashedToken = await bycrypt.hash(refreshToken, salt)
                await client.query(
                    `
                    UPDATE users
                    SET refresh_token = $1
                    WHERE email = $2 and password = $3
                    `,
                    [hashedToken, email, response.rows[0].password]
                )
                return res.status(200).send({accessToken: accessToken, refreshToken: refreshToken})
            }else{
                return res.status(400).send("USER NOT FOUND")
            }
        }catch(error){
            console.error(error)
            return res.status(500).send("SERVER_ERROR")
        }
    },
    user_token_post : async function(req, res){
        const {email, password, refresh_token} = req.body
        try {
            const response = await client.query(
                `
                SELECT refresh_token, password FROM users
                WHERE email = $1
                `,
                [email]
            )
            if(await bycrypt.compare(password, response.rows[0].password) && await bycrypt.compare(refresh_token, response.rows[0].refresh_token) ){
                if(refresh_token == null){
                    return res.status(401)
                }
                jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
                    if(err){
                    return res.status(403).send("Acces Denied")
                    }
                    const accessToken = authJwt.generate_access_token({email: user.email, password: user.password})
                    return res.status(200).send({accessToken: accessToken})
                })
            }
        }catch(error){
            console.error(error)
            return res.status(500).send("SERVER_ERROR")
        }
    },
    user_token_delete: async function(req, res){
        const {email, password} = req.body
        try {
            const response = await client.query(
                `
                SELECT password FROM users
                WHERE email = $1
                `,
                [email]
            )
            if(await bycrypt.compare(password, response.rows[0].password)){

                await client.query(
                    `
                    UPDATE users
                    SET refresh_token = NULL
                    WHERE email = $1 and password = $2
                    `,
                    [email, response.rows[0].password]
                )

                return res.status(204).send("Token deleted")
            }else{
                return res.status(404).send("User not found")
            }
            
        }catch(error){
            console.error(error)
            return res.status(505).send("SERVER_ERROR")
        }
    }
}