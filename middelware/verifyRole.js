const ApiError = require("../utils/ApiError");

const verifyRole = (requiredRole) =>  (req, res, next) =>
       {
      const userRole = req.decodedToken.role; 
      
      if (userRole !== requiredRole) {
        return next (new ApiError ('Access denied. You do not have the required role.' ,403))
      }
      next(); 
    };
 
  
  module.exports = verifyRole
