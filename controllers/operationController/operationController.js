const { generateToken } = require('../../config/helpers/generateToken');
const User = require('../../models/customerModel/userModel');
const Operation = require('../../models/operations/operationsModel');

const createOperation = async (req, res) => {
  const { user } = req;
  const { consumed } = req.body;
  const { id_box } = req.params;
  try {
    const userBox = user.purchasedBoxes.find(box => box._id.toString() === id_box.toString());
    if (!userBox)
      return res.status(404).json({
        message: `You don't have access to this Box, sorry 🥲, but you can purchase it by clicking here: ${process.env.FRONTEND_URL_IP}/box/${id_box}`,
      });
    if (userBox.remainingItems === 0) {
      return res.status(400).json({
        message: `You have exceeded the limit 😅. but you can reload it by clicking here: ${process.env.FRONTEND_URL_IP}/box/${id_box}`,
      });
    } else if (Number(consumed) > userBox.remainingItems) {
      return res.status(400).json({
        message: `You don't have enough credits for this order🤔, we suggest reloading by clicking here: ${process.env.FRONTEND_URL_IP}/box/${id_box}`,
      });
    } else {
      const token = generateToken();
      const newOperation = new Operation({
        id_user: user._id,
        id_box: id_box,
        consumed,
        secure_token: token,
      });
      await newOperation.save();
      userBox.remainingItems -= Number(consumed);
      await user.save();
      return res.status(201).json({
        message: `Please click here to generate your QR Code 🤩`,
        code: `${process.env.FRONTEND_URL_IP}/box/${id_box}/generate-qr-code/${token}`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

const updateOperation = async (req, res) => {
  const { operation } = req;
  const { user } = req;
  const { consumed, status } = req.body;

  try {
    let updatedOperation;
    if (status.includes('finish')) {
      updatedOperation = await Operation.findByIdAndUpdate(
        operation._id,
        {
          id_restaurant: user.id_restaurant,
          consumed: consumed,
          secure_token: '',
          status: 'finish',
        },
        { new: true }
      );
      if (!updatedOperation)
        return res.status(409).json({
          message: `Something went wrong, please contact support and provide the support number:${operation.secure_token}`,
        });
      return res.status(201).json({ message: 'Operation successfully🤩', operation: updatedOperation });
    } else if (status.includes('cancelled')) {
      updatedOperation = await Operation.findByIdAndUpdate(
        operation._id,
        {
          id_restaurant: user.id_restaurant,
          secure_token: '',
          status: 'cancelled',
        },
        { new: true }
      );
      if (!updatedOperation)
        return res.status(409).json({
          message: `Something went wrong, please contact support and provide the support number:${operation.secure_token}`,
        });
      const customer = await User.findById(updatedOperation.id_user);
      const box_customer = customer.purchasedBoxes.find(
        box => box._id.toString() === updatedOperation.id_box.toString()
      );
      box_customer.remainingItems += updatedOperation.consumed;
      await customer.save();

      return res.status(201).json({ message: 'Operation cancelled😢', operation: updatedOperation });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};
module.exports = {
  createOperation,
  updateOperation,
};
