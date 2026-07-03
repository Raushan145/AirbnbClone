import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {

    try {

        const token = req.cookies.token
        
        if(!token){
            return res.status(400).json({message:"token not Found"})
        }

        const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
        if(!decodeToken){
             return res.status(400).json({message:"token not Verify"})
        }
        
        req.userId = decodeToken.userId;
        next()

    } catch (error) {
        res.status(500).json({message:`isAuth Error ${error}`});
    }

}

export default isAuth;