const Admin = require('../models/adminModel/adminModel');
const User = require('../models/customerModel/userModel');
const UserRestaurant = require('../models/restaurantModel/UserRestaurantModel');

const existTokenUser = async (req, res, next) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: 'Token not found, please login😉' });
    else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};
const existTokenRestaurant = async (req, res, next) => {
  const { token } = req.params;
  try {
    const user = await UserRestaurant.findOne({ token });
    if (!user) return res.status(404).json({ message: 'Token not found, please login😉' });
    else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

const existTokenAdmin = async (req, res, next) => {
  const { token } = req.params;
  try {
    const admin = await Admin.findOne({ token });
    if (!admin) return res.status(404).json({ message: 'Token not found, please login😉' });
    else {
      req.admin = admin;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

module.exports = {
  existTokenUser,
  existTokenRestaurant,
  existTokenAdmin,
};
