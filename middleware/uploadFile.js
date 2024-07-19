const multer = require('multer');
const fs = require('fs');
const xlsx = require('xlsx');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const uploadFile = multer({ storage: storage });

module.exports = { uploadFile };
