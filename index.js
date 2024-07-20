require('dotenv').config();
const EXPRESS = require('express');
const CORS = require('cors');
const CONNECTDDBB = require('./config/CONNECTDDBB');
const CONNECTION_CLOUDINARY = require('./config/CONNECTION_CLOUDINARY');

// CONF APP
const APP = EXPRESS();
APP.use(EXPRESS.json());
// END CONF APP

// CONNECT DDBB
CONNECTDDBB();
// END CONNECT DDBB

// CONNECT CLOUNINARY
CONNECTION_CLOUDINARY();
// END CONNECT CLOUNINARY

//CORS
/* const whitelist = [process.env.FRONTEND_URL_IP]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS ERROR'))
    }
  }
}
APP.use(CORS(corsOptions)) */
APP.use(CORS());
// END CORS

// ROUTERS
// ADMIN ROUTES
const adminRouter = require('./routes/adminRoutes/adminRouter');
APP.use('/api/v1/secure/admin', adminRouter);

const boxRouter = require('./routes/adminRoutes/boxRouter');
APP.use('/api/v1/secure/admin/box', boxRouter);

const customerRouter = require('./routes/adminRoutes/customerRouter');
APP.use('/api/v1/secure/admin/customer', customerRouter);

const restaurantRouter = require('./routes/adminRoutes/restaurantRouter');
APP.use('/api/v1/secure/admin/restaurant', restaurantRouter);

// USERS "CUSTOMER" ROUTES
const userRouter = require('./routes/customerRoutes/userRouter');
APP.use('/api/v1/user', userRouter);

// USERS RESTAURANT ROUTES
const userRestaurantRouter = require('./routes/restaurantRoutes/userRestaurantRouter');
APP.use('/api/v1/restaurant/user', userRestaurantRouter);

// REVIEW AND COMMENTS ROUTES
const reviewCommentsRouter = require('./routes/reviews_commentsRoutes/reviewCommentsRouter');
APP.use('/api/v1/review-comments', reviewCommentsRouter);

// OPERATION
const operationRouter = require('./routes/operationRoutes/operationRoutes');
APP.use('/api/v1/secure/operation', operationRouter);

APP.get('*', (req, res, next) => {
  const ERROR = 'URL NOT FOUND😢';
  next(ERROR);
});
APP.use((error, req, res, next) => {
  console.log(error);
  return res.status(500).send(error);
});
// END ROUTERS

// SERVER RUNNING
const PORT = process.env.PORT || 4000;
APP.listen(PORT, () => console.log(`SERVER RUNNIG, PORT: ${PORT}`));
