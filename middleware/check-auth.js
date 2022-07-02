const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{

try{
const token = req.headers.authorization.split(" ")[1];
console.log(token)
const verify = jwt.verify(token, 'This is Dummy Text');
console.log(verify);
next();
}
catch(err)
{
   return res.status(401).json({
        msg: "Invalid Token"
    })
}
 
}