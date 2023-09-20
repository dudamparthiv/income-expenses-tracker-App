const User = require("../../model/User");
const Account = require("../../model/Account");
const Transaction = require("../../model/Transaction");
const appErr = require("../../utils/appErr");
const transactionsCtrl = {
  //create
  createTransactions: async (req, res, next) => {
    const {name, transactionType, account, amount, category, notes}= req.body;
    try {
      const userfound =await User.findById(req.user)
      if(!userfound){
        return next(appErr("user not found",404));
      }else{
        const accountfound =await Account.findById(account)
        if(!accountfound){
          return next(appErr("Account not found",404));
        }else{
          const transaction = await Transaction.create({
            name,
            transactionType,
            account,
            amount,
            category,
            notes,
            createdBy:req.user,
          })
          accountfound.transactions.push(transaction._id)
          await accountfound.save()
          res.json({
            status: "success",
            data:transaction,
          });
        }
      }
    } catch (err) {
      return next(appErr(err.message));
    }
  },
  //all transactions
  allTransactionDetails: async (req, res, next) => {
    try {
      const transaction = await Transaction.find()
      res.json({
        status: "success",
        data: transaction
      });
    } catch (err) {
      return next(appErr(err.message));
    }
  },
  //single transaction
  transactionDetails: async (req, res, next) => {
    try {
      const {id} = req.params;
      const transaction = await Transaction.findById(id)
      res.json({
        status:"success",
        data: transaction,
      });
    } catch (err) {
      return next(appErr(err.message));
    }
  },
  //delete transaction
  deleteTransactions: async (req, res, next) => {
    try {
      const {id} = req.params
      await Transaction.findByIdAndDelete(id)
      res.json({
        data: "deleted successfully",
      });
    } catch (err) {
      return next(appErr(err.message));
    }
  },
  // update transaction
  updateTransactions: async (req, res, next) => {
    try {
      const {id} = req.params;
      const transaction = await Transaction.findByIdAndUpdate(id,req.body,{
        new: true,
        runValidators: true,
      })
      res.json({
        status:"success",
        data: transaction,
      });
    } catch (err) {
      return next(appErr(err.message));
    }
  },
};

module.exports = transactionsCtrl;
