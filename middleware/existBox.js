const Box = require('../models/adminModel/box-pack/boxPackModel')

const existBox = async (req, res, next) => {
  const { id_box } = req.params
  try {
    const exist_box = await Box.findById(id_box)
    if (!exist_box) {
      return res.status(404).json({ message: 'Box not found🔐' })
    } else {
      req.box = exist_box
      next()
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Ups, there was a problem, close sesion.😑'
    })
  }
}

module.exports = { existBox }
