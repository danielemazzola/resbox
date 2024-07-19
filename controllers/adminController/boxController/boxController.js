const Box = require('../../../models/adminModel/box-pack/boxPackModel');

const createBox = async (req, res) => {
  const { user } = req;
  try {
    const new_box = new Box({
      ...req.body,
      usage_limit: req.body.items_included + req.body.bonus_items,
      creator: user._id,
    });
    await new_box.save();
    return res.status(201).json({ message: 'Box created successfully🤩', new_box });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

const update_box = async (req, res) => {
  const { box } = req;
  const { user } = req;
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

const remove_box = async (req, res) => {
  const { box } = req;
  const { user } = req;
  try {
    const isAcquired = await Box.findById(box._id);
    if (!isAcquired.items_acquired_by.length) {
      const remove = await Box.findByIdAndDelete(box._id);
      if (!remove) return res.status(409).json({ message: 'Box not found🤔' });
      return res.status(200).json({ message: '🔴Box delete successfull' });
    } else {
      return res.status(409).json({
        message:
          "The box can't be deleted because it has been acquired by users. You can change its status to inactive to stop sales.😅",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

const get_box = async (req, res, next) => {
  const { box } = req;
  const { user } = req;
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

const get_boxes = async (req, res) => {
  const { box } = req;
  const { user } = req;
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

module.exports = {
  createBox,
  update_box,
  remove_box,
  get_box,
  get_boxes,
};
