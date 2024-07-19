const User = require('../models/customerModel/userModel');
const UserRestaurant = require('../models/restaurantModel/UserRestaurantModel');
const Admin = require('../models/adminModel/adminModel');
const { verifyToken } = require('../config/helpers/generateJWT');

const isAuthUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token)
    return res.status(401).json({
      message: 'There has been a problem with the authentication token, please try logging in again😢',
    });
  try {
    const decode = verifyToken(token, process.env.JWT_KEY);
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(401).json({
        message: 'You are not registerd on the website, please register😑',
      });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'There was an error in the system, please log in 🤯' });
  }
};

const isAuthRestaurant = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token)
    return res.status(401).json({
      message: 'There has been a problem with the authentication token, please try logging in again😢',
    });
  try {
    const decode = verifyToken(token, process.env.JWT_KEY);
    const user = await UserRestaurant.findById(decode.id);
    if (!user) {
      return res.status(401).json({
        message: 'You are not registerd on the website, please register😑',
      });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'There was an error in the system, please log in 🤯' });
  }
};

const isAuthSuperAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token)
    return res.status(401).json({
      message: 'There has been a problem with the authentication token, please try logging in again😢',
    });
  try {
    const decode = verifyToken(token, process.env.JWT_KEY);
    const user = await Admin.findById(decode.id);
    if (!user) {
      return res.status(401).json({
        message: 'You are not registerd on the website, please register😑',
      });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'There was an error in the system, please log in 🤯' });
  }
};

module.exports = { isAuthUser, isAuthRestaurant, isAuthSuperAdmin };
