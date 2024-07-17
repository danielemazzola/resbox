const Box = require('../../../models/restaurantModel/box-pack/boxPackModel')
const Restaurant = require('../../../models/restaurantModel/restaurantModel')

const createBox = async (req, res) => {
  const { user } = req
  try {
    const new_box = new Box({
      ...req.body,
      id_restaurant: user.id_restaurant,
      usage_limit: req.body.items_included + req.body.bonus_items,
      creator: user._id
    })
    await new_box.save()
    const pushBoxRestaurant = await Restaurant.findByIdAndUpdate(
      user.id_restaurant,
      {
        boxes: new_box._id
      },
      { new: true }
    )
    return res
      .status(201)
      .json({ message: 'Box created successfully🤩', new_box })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

module.exports = {
  createBox
}
