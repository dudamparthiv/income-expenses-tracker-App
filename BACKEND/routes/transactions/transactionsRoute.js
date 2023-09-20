const express = require("express");
const transactionsCtrl = require("../../controllers/transactions/transactionsCtrl");
const isLogin = require("../../middlewares/isLogin")
const transactionsRouter = express.Router();

//POST/api/v1/transactions
transactionsRouter.post('/',isLogin,transactionsCtrl.createTransactions)

//GET/api/v1/transactions
transactionsRouter.get('/',transactionsCtrl.allTransactionDetails)

//GET/api/v1/transactions/:id
transactionsRouter.get('/:id',transactionsCtrl.transactionDetails)

//DELETE/api/v1/transactions/:id
transactionsRouter.delete('/:id',transactionsCtrl.deleteTransactions)

//PUT/api/v1/transactions/:id
transactionsRouter.put('/:id',transactionsCtrl.updateTransactions)


module.exports = transactionsRouter;