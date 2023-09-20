const express = require("express");
const accountsCtrl = require("../../controllers/accounts/accountsCtrl");
const isLogin = require("../../middlewares/isLogin");

const accountsRouter = express.Router();

//POST/api/v1/accounts
accountsRouter.post('/',isLogin,accountsCtrl.createAccountCtrl)

//GET/api/v1/accounts
accountsRouter.get('/',accountsCtrl.allAccountDetailsCtrl)

//GET/api/v1/accounts/:id
accountsRouter.get('/:id',accountsCtrl.accountDetailsCtrl)

//DELETE/api/v1/accounts/:id
accountsRouter.delete('/:id',accountsCtrl.deleteAccountCtrl)

//PUT/api/v1/accounts/:id
accountsRouter.put('/:id',accountsCtrl.updateAccountCtrl)

module.exports = accountsRouter;