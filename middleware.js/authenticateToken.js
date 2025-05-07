import jwt from "jsonwebtoken"

const authenticateToken = (req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access Denied: No token provided');
      }

      try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'pawankumar'); 
    
       
        req.user = decoded; 
    
        next(); 
      } catch (err) {
        res.status(400).send('Invalid token');
      }
}


export default authenticateToken;
