const isAdmin = user => {
  const isAdmin = user.roles && user.roles.includes('admin');
  const userResponse = {
    ...user._doc,
    id_restaurant: {
      ...user.id_restaurant._doc,
      bank_number_account: isAdmin ? user.id_restaurant.bank_number_account : undefined,
    },
  };
  return userResponse;
};

module.exports = { isAdmin };
