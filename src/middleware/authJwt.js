const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

    verify_auth : (req, res, next) => {
        //Authorization Middleware
        const authHeader = req.get('authorization')
        if(!authHeader){
            return res.status(401).send("Access Denied")
        }else{
            //Validation JWT
            const token = authHeader && authHeader.split(' ')[1]
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
                if(err){
                    console.log(`JWT ERROR: ${err}`)
                    return res.status(403).send("Error: Access Denied")
                }else{
                    req.user = user
                    next()
                }
            })
        }
    },
    generate_access_token: (user)=>{
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
    }

}