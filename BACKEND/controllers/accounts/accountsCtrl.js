const Account = require("../../model/Account");
const User = require("../../model/User");
const appErr = require("../../utils/appErr");

const accountsCtrl = {
  //create
  createAccountCtrl: async (req, res, next) => {
    const {name, initialBalance, accountType, notes} = req.body;
    try {
      //find the logged in user
      const userfound = await User.findById(req.user);
      if (!userfound) {
        return next(appErr("user not found", 404));
      } else {
        //create the account
        const account = await Account.create({
            name,
            initialBalance,
            accountType,
            notes,
            createdBy: req.user,
        });
        userfound.accounts.push(account._id)
        await userfound.save();
        res.json({
            status: "success",
            data: account,
          });
      }
     
    } catch (err) {
      return next(appErr(err.message));
    }
  },
  //all details
  allAccountDetailsCtrl: async (req, res, next) => {
    try {
      const account = await Account.find().populate("transactions")
      res.json({
        data: account,
      });
    } catch (err) {
        return next(appErr(err.message));
    }
  },
  // single account details
  accountDetailsCtrl: async (req, res, next) => {
    try {
      const {id} = req.params;
      const account = await Account.findById(id).populate("transactions");
      res.json({
        status:"success",
        data: account,
      });
    } catch (err) {
        return next(appErr(err.message));
    }
  },
  //delete
  deleteAccountCtrl: async (req, res, next) => {
    try {
      const {id}= req.params;
      await Account.findByIdAndDelete(id)
      res.json({
        status:"success",
        data: "deleted successfully",
      });
    } catch (err) {
        return next(appErr(err.message));
    }
  },
  //update
  updateAccountCtrl: async (req, res, next) => {
    try {
      const {id}= req.params;
      const account = await Account.findByIdAndUpdate(id,req.body,{
        new: true,
        runValidators: true,
      })
      res.json({
        status: "success",
        data: account,
      });
    } catch (err) {
        return next(appErr(err.message));
    }
  },
};

module.exports = accountsCtrl;
