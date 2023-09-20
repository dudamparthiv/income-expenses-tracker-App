const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const appErr = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const usersCtrl = {
  //register
  registeruserCtrl: async (req, res, next) => {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return next(appErr("all fields are required"));
    } else {
      try {
        //check if user is already registered
        const userfound = await User.findOne({ email });
        if (userfound) {
          return next(appErr("user already registered", 400));
        } else {
          //hash password
          const salt = await bcrypt.genSalt(10);
          const passwordHashed = await bcrypt.hash(password, salt);
          //register user
          const user = await User.create({
            fullname,
            email,
            password: passwordHashed,
          });
          res.json({
            status: "success",
            data: user,
          });
        }
      } catch (err) {
        res.json(next(appErr(err.message)));
      }
    }
  },
  // login
  loginuserCtrl: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(appErr("all fields are required"));
    } else {
      try {
        const userfound = await User.findOne({ email });
        //check if user not found
        if (!userfound) {
          return next(appErr("invalid login credentials", 404));
        } else {
          //check if password is valid
          const isPasswordValid = await bcrypt.compare(
            password,
            userfound.password
          );
          if (!isPasswordValid) {
            return next(appErr("invalid login credentials", 404));
          } else {
            //save the user into session
            //req.session.userAuth = userfound._id;
            res.json({
              status: "success",
              fullname: userfound.fullname,
              id:userfound._id,
              token: generateToken(userfound._id),
            });
          }
        }
      } catch (err) {
        res.json(next(appErr(err.message)));
      }
    }
  },
  //profile details
  usersDetailsCtrl: async (req, res, next) => {
    try {
      const user = await User.findById(req.user).populate({
        path: "accounts",
        populate: {
          path: "transactions",
          model: "Transaction",
        },
      });
      res.json(user);
    } catch (err) {
      return next(appErr(err.message));
    }
  },
  //delete user
  deleteUserCtrl: async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.user);
      res.json({
        status: "success",
        data: "deleted successfully",
      });
    } catch (err) {
      return next(appErr(err.message));
    }
  },
  //update user
  updateUserCtrl: async (req, res, next) => {
    const { fullname, email, password } = req.body;
    try {
      if (fullname || email) {
        const emailTaken = await User.findOne({ email });
        if (emailTaken) {
          return next(appErr("email already taken", 400));
        } else {
          const user = await User.findByIdAndUpdate(
            req.user,
            {
              fullname,
              email,
            },
            {
              new: true,
              runValidators: true,
            }
          );
          res.json({
            status: "success",
            data: user,
          });
        }
      }else if(password) {
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        const user = await User.findByIdAndUpdate(
          req.user,
          {
            password: passwordHashed,
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return res.json({
          status: "success",
          data: user,
        });
        
      }else {
        return next(appErr("email or password field is required"));
      }
    } catch (err) {
      return next(appErr(err.message));
    }
  },
};

module.exports = usersCtrl;
