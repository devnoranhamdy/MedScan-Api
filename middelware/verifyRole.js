const verifyToken = require ('./verifyToken')

const verifyRole = (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.decodedToken.role; 
      
      if (userRole !== requiredRole) {
        return res.status(403).json({
          status: httpStatusText.ERROR,
          data: 'Access denied. You do not have the required role.'
        });
      }
  
      next(); 
    };
  };
  
  module.exports = verifyRole
