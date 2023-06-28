const propertyController = require('../controllers/propertyController.js');
const auth = require('../middleware/auth.js');
const multer = require('multer');

const router = require('express').Router();

const uploads = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
      callback(
        null,
        new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
      );
    },
  }),
});

router.post('/add-property', auth, propertyController.addProperty);
router.post(
  '/add-property-files',
  auth,
  uploads.array('files'),
  propertyController.addMedia
);
router.post('/edit-property', auth, propertyController.updateProperty);
router.post('/list-property', auth, propertyController.getAllProperty);
router.post(
  '/list-property-archieved',
  auth,
  propertyController.getAllPropertyArchieved
);
router.post('/property-by-id', auth, propertyController.getOneProperty);
router.post('/delete-property', auth, propertyController.deleteProperty);
router.post('/delete-file', auth, propertyController.deletePropertyFile);
router.post('/download-file', auth, propertyController.download);

module.exports = router;
