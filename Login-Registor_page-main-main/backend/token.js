import jwt from 'jsonwebtoken';
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET;

// JWT authentication middleware
 const authenticateToken = (req, res, next)=> {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
    
    if (!token) return res.status(401).json({ msg: "Access denied" });
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ msg: "Invalid token" });
      req.user = user;
      next();
    });
  }

  export default authenticateToken;