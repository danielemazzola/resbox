const Operation = require('../models/operations/operationsModel');

const existSecureTokenOperation = async (req, res, next) => {
  const { secure_token } = req.params;
  try {
    const exist = await Operation.findOne({ secure_token });
    if (!exist) return res.status(409).json({ message: 'Operation not found🤔' });
    req.operation = exist;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Ups, there was a problem, close sesion.😑',
    });
  }
};

module.exports = { existSecureTokenOperation };
