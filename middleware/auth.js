const jwt=require("jsonwebtoken")
const conn = require("../dbConfig")
const dotenv = require('dotenv');
dotenv.config();

const auth=async(req,res,next)=>{

    try{
        const idToken=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(idToken,process.env.SECRET_KEY)
        req.id=decoded.id
        const result = await conn.query(`SELECT * FROM users WHERE id="${req.id}"`);
        if(result.length == 0){
            return res.status(400).send({
                        msg:err})
        }
        return next(); 
    }catch(e){
          res.status(401).send({error: "please authenticate."})
    }
}

module.exports=auth