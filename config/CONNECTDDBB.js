const mongoose = require('mongoose')

const CONNECTDDBB = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_DDBB)
    console.log(`
    **     **  ******   **      **  ******   ******
    ***   *** **    **  ***     ** **    ** **    **
    **** ****/**      * ****    **/**      /**      *
    ** *** **/**      * ** **   **/**      /**      *
    **     **/**      * **  **  **/** *****/**      *
    **     ** **    **  **   ** **/**    ** **    **
    **     **  ******   **    ****  *******  ****** 
`)
  } catch (error) {
    console.log(error)
  }
}
module.exports = CONNECTDDBB
