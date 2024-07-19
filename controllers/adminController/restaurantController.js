let fs = require('fs');
const xlsx = require('xlsx');
const Restaurant = require('../../models/restaurantModel/restaurantModel');
const UserRestaurant = require('../../models/restaurantModel/UserRestaurantModel');

const newRestaurant = async (req, res) => {
  let duplicateEmail = [];
  try {
    const filePath = req.file.path;
    const reedFilePath = xlsx.readFile(filePath);
    const name_list_file = reedFilePath.SheetNames;
    const dataFile = xlsx.utils.sheet_to_json(reedFilePath.Sheets[name_list_file[0]]);

    const processRestaurant = async restaurant => {
      const { email } = restaurant;
      try {
        const exist = await Restaurant.findOne({ email });
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
            coordinate_y: restaurant.coordinate_y,
          });
          await newRestaurant.save();
        } else {
          duplicateEmail.push(email);
        }
      } catch (error) {
        console.error(`Error processing restaurant with email ${restaurant.email}:`, error);
      }
    };
    await Promise.all(dataFile.map(processRestaurant));
    res.status(200).send({ message: 'The file was processed successfully.', duplicateEmail });
  } catch (error) {
    res.status(500).send({ message: 'Error processing the file.' });
  } finally {
    // DELETE FILE
    fs.unlink(req.file.path, err => {
      if (err) console.error('Error deleting the file.', err);
    });
  }
};

const confirmAccountrestaurant = async (req, res) => {
  const { id_restaurant } = req.params;
  try {
    const isConfirmed = await Restaurant.findById(id_restaurant);
    const toggleConfirmed = await Restaurant.findByIdAndUpdate(
      id_restaurant,
      {
        confirmed: !isConfirmed.confirmed,
      },
      { new: true }
    );
    if (!toggleConfirmed) {
      return res.status(409).json({ message: 'Resturant not found, please contact with support😢' });
    } else {
      return res.status(201).json({
        message: `Restaurant ${toggleConfirmed.confirmed ? 'confirmed' : 'not confirmed'}`,
        toggleConfirmed,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};
const updateRolesUserRestaurant = async (req, res) => {
  const { id_user } = req.params;
  try {
    const user = await UserRestaurant.findById(id_user);
    const isAdmin = user.roles.find(admin => admin.includes('admin'));
    if (!isAdmin) {
      user.roles.push('admin');
    } else {
      user.roles.pop();
    }
    await user.save();
    return res
      .status(201)
      .json({ message: `The user's role is: ${user.roles.includes('admin') ? 'admin' : 'user'}`, user: user.roles });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ups, there was a problem, please try again😑' });
  }
};

module.exports = {
  newRestaurant,
  confirmAccountrestaurant,
  updateRolesUserRestaurant,
};
