const userStatus = async (req, res, next) => {
  const { user } = req;
  try {
    if (user.status.includes('suspend')) {
      return res.status(409).json({ message: 'User suspended, please contact with our support team🔐' });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'There was an error in the system, please log in 🤯' });
  }
};

module.exports = { userStatus };
