const Restaurant = require('../../models/restaurantModel/restaurantModel');
const Review = require('../../models/reviewsCommentsModel/reviewCommentModels');

const new_review = async (req, res) => {
  const { id_restaurant } = req.params;
  const { user } = req;
  const { review } = req.body;
  try {
    const existRestaurant = await Restaurant.findById(id_restaurant);
    if (!existRestaurant) return res.status(409).json({ message: 'Restaurant not found' });
    const new_review = new Review({
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
const new_comment = async (req, res) => {
  const { id_review } = req.params;
  const { user } = req;
  const { comment } = req.body;
  try {
    const review = await Review.findByIdAndUpdate(
      id_review,
      {
        replies: {
          comment: comment,
          id_user_restaurant: user._id,
        },
      },
      { new: true }
    );
    if (!review) return res.status(409).json({ message: 'Review not found🤨' });
    return res.status(201).json({ message: 'Reply created successfully🤩', review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

const reactions = async (req, res, next) => {
  const { user } = req;
  const { id_review } = req.params;
  const { reactionUser } = req.body;
  try {
    if (!reactionUser.includes('like', 'dislike')) {
      return res.status(409).json({ message: 'Hubo un error en la petición' });
    }
    const review = await Review.findById(id_review);
    if (!review) {
      return res.status(404).json({ message: 'Review not found😢' });
    }
    const existReaction = review.reactions.find(reaction => reaction.id_user.toString() === user._id.toString());
    if (existReaction) {
      if (existReaction.type === reactionUser) {
        await Review.updateOne(
          { _id: id_review, 'reactions.id_user': user._id },
          { $unset: { 'reactions.$.type': '' } }
        );
        return res.status(200).json({ message: 'Reaction removed❤️' });
      } else {
        await Review.updateOne(
          { _id: id_review, 'reactions.id_user': user._id },
          { $set: { 'reactions.$.type': reactionUser } }
        );
        return res.status(200).json({ message: 'Reaction updated❤️' });
      }
    } else {
      await Review.updateOne({ _id: id_review }, { $push: { reactions: { id_user: user._id, type: reactionUser } } });
      return res.status(201).json({ message: 'Reaction created❤️' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

module.exports = { new_review, new_comment, reactions };
