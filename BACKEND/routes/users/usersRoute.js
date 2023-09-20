const express = require("express");
const usersCtrl = require("../../controllers/users/usersCtrl");
const isLogin = require("../../middlewares/isLogin");

const usersRouter = express.Router();

//POST/api/v1/users/register
usersRouter.post('/register',usersCtrl.registeruserCtrl)

//POST/api/v1/users/login
usersRouter.post('/login',usersCtrl.loginuserCtrl)

//GET/api/v1/users/profile
usersRouter.get('/profile',isLogin,usersCtrl.usersDetailsCtrl)

//DELETE/api/v1/users
usersRouter.delete('/',isLogin,usersCtrl.deleteUserCtrl)

//PUT/api/v1/users
usersRouter.put('/',isLogin,usersCtrl.updateUserCtrl)

//PUT/api/v1/users
//usersRouter.put('/',isLogin,usersCtrl.updateUserPasswordCtrl)

module.exports = usersRouter;