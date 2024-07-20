const User = require('../../../models/customerModel/userModel');

const getUser = async (req, res) => {
  const { id_user } = req.params;
  try {
    const user = await User.findById(id_user);
    if (!user) return res.status(404).json({ message: 'User no found😅' });
    return res.status(200).json({ message: 'User found', user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

const updateStatus = async (req, res) => {
  const { id_user } = req.params;
  try {
    const user = await User.findById(id_user);
    if (!user) {
      return res.status(404).json({ message: 'User not found😢' });
    }
    const update = user.status.includes('suspend')
      ? { $pull: { status: 'suspend' } }
      : { $push: { status: 'suspend' } };
    const updatedUser = await User.findOneAndUpdate({ _id: id_user }, update, { new: true });
    return res.status(201).json({
      message: `The user's status is: ${updatedUser.status.includes('suspend') ? 'suspend' : 'active'}`,
      user: updatedUser.roles,
    });
  } catch (error) {}
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: `${users.length === 0 ? 'There are not users😢' : 'Users🤩'}`, users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

module.exports = {
  getUser,
  updateStatus,
  getUsers,
};
