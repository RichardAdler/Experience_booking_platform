const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/img/');
    },
    filename: function(req, file, cb) {
      const { exp_name, country, region } = req.body;
      const uniqueSuffix = exp_name + '-' + country + '-' + region;
      cb(null, uniqueSuffix + '-' + Date.now() + '.jpg');
    }
  });

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});

module.exports = upload;
