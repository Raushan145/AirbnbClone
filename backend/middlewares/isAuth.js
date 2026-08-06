import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {

    try {

        const token = req.cookies.token
        
        if(!token){
            return res.status(400).json({success: false, message: "Please login first",})
        }

        const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
        if(!decodeToken){
             return res.status(400).json({success:false, message:"access Denied"})
        }
        
        req.userId = decodeToken.userId;
        next()
        
    } catch (error) {
        res.status(500).json({success:false, message:`Invalid or expired token , isAuth Error ${error}`});
    }

}

export default isAuth;