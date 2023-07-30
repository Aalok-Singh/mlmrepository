var conn = require('../dbConfig');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
dotenv.config();

const getAllUser = async(req,res)=>{
    const rows = await conn.query(
        `SELECT * FROM users`
      );
      const data = rows;
      res.send({title: 'User List',userData: data});
}
const registerUser = async(req,res)=>{
    if(!req.body.email){
      return res.status(400).send({
        msg: 'email should not be empty'
      });
    }
    if(!req.body.password){
      return res.status(400).send({
        msg: 'password should not be empty'
      });
    }
    if(!req.body.role){
      return res.status(400).send({
        msg: 'role should not be empty'
      });
    }
    const rows = await conn.query(
        `SELECT * FROM users  WHERE email = "${req.body.email}"`
      );
if(rows.length != 0){
    return res.status(409).send({
        msg: 'This user is already in use!'
        });
}
const dateObject = new Date();
const result = await conn.query(
    `INSERT INTO users 
    (name, email, password, role) 
    VALUES 
    ("${req.body.name}", "${req.body.email}", "${bcrypt.hashSync(req.body.password, 8)}","${req.body.role}")`
  );
  if (result.affectedRows) {
    message = 'User created successfully';
    return res.status(409).send({
        msg: message
        });
  }
}
const loginUser = async(req,res)=>{
  const {email,password}=req.body
  if(!email || !password){
    return res.status(400).send({msg:"email or password must not be empty"})
  }
// return false;
  const result = await conn.query(`SELECT * FROM users WHERE email="${email}"`);
  if(result.length == 0){
    return res.status(409).send({
      msg:'email or password is incorrect'
      });
  }
// console.log(result[0].password)
// return false;
  bcrypt.compare(password,result[0].password).then(isMatch=>{
               
    if(isMatch===false){
        return res.status(401).send({
          msg:"email or Password is incorrect "
      })
    }

   //generate token
   const token=jwt.sign({id:result[0].id.toString()},process.env.SECRET_KEY)   
     return res.status(200).send({
      msg:"logged in successfully",
      user:result[0],
      token
   })

})
  

} 

module.exports = {getAllUser,registerUser,loginUser};