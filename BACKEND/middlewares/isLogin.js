const appErr = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
  //get the token from req header
  const token = getTokenFromHeader(req);
  //verify
  const decodedUser = verifyToken(token);
  //save the user into req obj
  
  if (!decodedUser) {
    return next(appErr("Invalid/Expired token, please login again", 401));
  }else{
    req.user = decodedUser.id;
  }
  next()
};

module.exports = isLogin;
