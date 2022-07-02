const app = require("./app")
const port = process.env.PORT || 3000


app.listen(port,()=>{
    console.log("Server is lisetening on port 3000")
})