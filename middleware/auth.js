const jwt = require("jsonwebtoken");

let auth = async (req, res, next) => {
  let { authorization } = req.headers;
  if(!authorization){
    return res.json({ message: "Please login first" });
  }
  try{
    let decoded= await jwt.verify(authorization,process.env.SECRET);
    req.id= decoded.id;
    req.role=decoded.role
  }
  catch(err)
  {
    return res.json({ message: "unauthorized" });
  }
  
  next();
};

let restrictTo =  (...roles)=>{
    return (req, res, next) => {
        if(!roles.includes(req.role)){
            return res.json({ message: "unauthorized" });
        }
        next();
    }
}
module.exports={auth,restrictTo};
