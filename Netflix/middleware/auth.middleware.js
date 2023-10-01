import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try{
    if(req.headers.authorization){
     const token = req.headers.authorization;
     const check_token = jwt.verify(token, "test");
     
     if(check_token){
        next();
     }
     else{
        return res.status(401).json({
            message:'Invalid token'
        });
     }
    }
    else{
        return res.status(401).json({
            message:'Invalid token'
        })
    }
  }catch(err){
        return res.status(401).json({
            message:err.message
        })
    }
}

export default auth;