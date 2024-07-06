require('dotenv').config()
const EXPRESS = require('express')
const CORS = require('cors')
const CONNECTDDBB = require('./config/CONNECTDDBB')
const CONNECTION_CLOUDINARY = require('./config/CONNECTION_CLOUDINARY')

// CONF APP
const APP = EXPRESS()
// END CONF APP

// CONNECT DDBB
CONNECTDDBB()
// END CONNECT DDBB

// CONNECT CLOUNINARY
CONNECTION_CLOUDINARY()
// END CONNECT CLOUNINARY

//CORS
const whitelist = [process.env.FRONTEND_URL_IP]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS ERROR'))
    }
  }
}
APP.use(CORS(corsOptions))
// END CORS

// ROUTERS
const userRouter = require('./routes/userRoutes')
APP.use('/api/v1/user', userRouter)

const userRestaurantRouter = require('./routes/userRoutes')
APP.use('/api/v1/restaurant/user', userRestaurantRouter)

/* const restaurentRouter = require('./routes/userRoutes')
APP.use('/api/v1/restaurant', restaurentRouter) */

APP.get('*', (req, res, next) => {
  const ERROR = 'URL NOT FOUND😢'
  next(ERROR)
})
APP.use((error, req, res, next) => {
  return res.status(500).send(error)
})
// END ROUTERS

// SERVER RUNNING
const PORT = process.env.PORT || 4000
APP.listen(PORT, () => console.log(`SERVER RUNNIG, PORT: ${PORT}`))
