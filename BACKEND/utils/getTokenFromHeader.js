const appErr = require("./appErr");

const getTokenFromHeader = req =>{
    const headerObj = req.headers["authorization"];
    if (typeof headerObj !== undefined) {
      token = headerObj.split(" ");
      token = token[1];
      return token;
    } else {
      return next(appErr("token is not valid", 401));
    }
}

module.exports = getTokenFromHeader;