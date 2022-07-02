const express = require('express')
const router = express.Router();
const checkAuth = require('../../middleware/check-auth')

const AWS = require('aws-sdk');
const multer = require('multer');
const storage = multer.memoryStorage()

// const upload = multer({storage: storage});
const upload = multer({storage: storage});

const {adminRegister, adminLogin, getAdminProfile, adminChangePassword} = require('../controllers/admincontrollers')
const {addSliderId, adddSliderImage, getBySliderId, addSliderName, updateSliderName, deleteSlider} = require('../controllers/getslidercontroller')
router.post('/register',adminRegister)
router.post('/login',adminLogin)
router.get('/profile/:id',checkAuth,getAdminProfile)
router.get('/change-password/:adminId',adminChangePassword)
router.post('/addSliderId', addSliderId)
router.put('/uploadImage/:sliderId',upload.single("uploadImage") , adddSliderImage )
router.get('/getBySliders', getBySliderId)
router.post('/addSliderName',addSliderName)
router.put('/updateSliderName/:id',updateSliderName)
router.delete('/removeSliderName/:id',deleteSlider)



module.exports = router;