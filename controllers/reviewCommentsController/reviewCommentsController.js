const Restaurant = require('../../models/restaurantModel/restaurantModel');
const Comment = require('../../models/reviewsCommentsModel/reviewCommentModels');

const new_review = async (req, res) => {
  const { id_restaurant } = req.params;
  const { user } = req;
  const { review } = req.body;
  try {
    const existRestaurant = await Restaurant.findById(id_restaurant);
    if (!existRestaurant) return res.status(409).json({ message: 'Restaurant not found' });
    const new_review = new Comment({
      review: review,
      id_restaurant: existRestaurant._id,
      id_user: user._id,
    });
    await new_review.save();
    existRestaurant.review.push(new_review._id);
    user.review.push(new_review._id);
    await existRestaurant.save();
    await user.save();
    return res.status(201).json({ message: 'Review created successfully🤩. ¡Thank you!', new_review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};
const new_comment = async (req, res) => {};
const reactions = async (req, res) => {};

module.exports = { new_review, new_comment, reactions };
