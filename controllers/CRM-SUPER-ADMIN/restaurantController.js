const createRestaurant = async (req, res, next) => {
  const { file } = req.body
  console.log(file)
}

module.exports = {
  createRestaurant
}
