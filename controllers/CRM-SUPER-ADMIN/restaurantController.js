let fs = require('fs')
const xlsx = require('xlsx')
const Restaurant = require('../../models/restaurant/restaurantModel')
const newRestaurant = async (req, res) => {
  try {
    const filePath = req.file.path
    const reedFilePath = xlsx.readFile(filePath)
    const name_list_file = reedFilePath.SheetNames
    const dataFile = xlsx.utils.sheet_to_json(
      reedFilePath.Sheets[name_list_file[0]]
    )
    let duplicateEmail = []
    dataFile.map(async (restaurant) => {
      const { email } = restaurant
      console.log(email)
      try {
        const exist = await Restaurant.findOne({ email })
        if (!exist) {
          const newRestaurant = new Restaurant({
            restaurant_name: restaurant.restaurant_name,
            restaurant_cif: restaurant.restaurant_cif,
            owner_name: restaurant.owner_name,
            owner_lastName: restaurant.owner_lastName,
            phone: restaurant.phone,
            email: restaurant.email,
            bank_name: restaurant.bank_name,
            bank_number_account: restaurant.bank_number_account,
            offices_address: restaurant.offices_address,
            coordinate_x: restaurant.coordinate_x,
            coordinate_y: restaurant.coordinate_y
          })
          await newRestaurant.save()
        } else {
          duplicateEmail.push(email)
          console.log(duplicateEmail)
          console.log(`Restaurant with email ${email} already exists.`)
        }
      } catch (error) {
        console.error(
          `Error processing restaurant with email ${restaurant.email}:`,
          error
        )
      }
    })
    res.status(200).send({ message: 'The file was processed successfully.' })
  } catch (error) {
    res.status(500).send({ message: 'Error processing the file.' })
  } finally {
    // DELETE FILE
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting the file.', err)
    })
  }
}
const confirmAccountrestaurant = async (req, res) => {}
const updateRolesUserRestaurant = async (req, res) => {}

module.exports = {
  newRestaurant,
  confirmAccountrestaurant,
  updateRolesUserRestaurant
}
