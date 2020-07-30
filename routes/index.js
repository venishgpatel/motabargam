const express = require('express');
const router = express.Router();

const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/', appController.homePage);
router.get('/contact', appController.contactUs);

router.get('/member', appController.getMembers);
router.get('/member/listBy', appController.getMembersByStateAndNative);
// router.get('family/:familyNo', userController.viewFamily);
router.get('/family/add', userController.addFamilyForm);
router.post('/family/add', userController.addFamily);

router.get('/authenticate', authController.userAuthForm);
router.post('/authenticate', authController.userAuth);
router.get('/register', userController.register);
router.get('/matrimony', appController.matrimony);

module.exports = router;
