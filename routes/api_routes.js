const express = require("express");
const router = express.Router();
const {authenticate} = require("../middlewares/admin_middleware");
const multer=require("multer");
const upload=multer();
const fileUpload=require('../middlewares/upload_middleware');
const homeController=require('../controllers/home_controller');
const formController=require('../controllers/form_controller');
const trackingController=require('../controllers/tracking_controller');
const authController = require("../controllers/admin/admin_auth_controller");
const adminFormController=require('../controllers/admin/admin_form_controller')
const adminUserController=require('../controllers/admin/admin_user_controller')
const adminPendingController=require('../controllers/admin/admin_pending_controller')
const managerHistoryController=require('../controllers/admin/manager_history_controller')
// router.use(authenticate);
// FRONTEND
router.get('/get-faq/:limit',homeController.getFaq);
router.get('/get-relation',homeController.getRelation);
router.get('/get-district',homeController.getDistrict);
router.get('/get-constituency/:id',homeController.getConstituencyById)
router.post('/upload-file',fileUpload.single('file'),formController.uploadFile);
router.post('/send-otp',upload.any(),formController.sendOtp)
router.post('/verify-otp',upload.any(),formController.verifyOtp);
router.post('/submit-form',upload.any(),formController.submitForm);
router.get('/view-application/:trackingId',trackingController.viewApplication)
router.get('/track-application/:trackingId',trackingController.trackApplication)

// ADMIN
//ADMIN ROUTES

//USERS
router.post("/create-admin",authController.createAdmin);
router.post("/login",upload.any(),authController.login);
router.get("/me", authenticate, authController.getAuthUser);
router.get('/get-stats',authenticate,adminFormController.index);
router.get('/users',authenticate,adminUserController.users);
router.get('/get-roles',authenticate,adminUserController.getRoles)
router.post('/submit-users',authenticate,adminUserController.submitUser)
router.put('/edit-users',authenticate,adminUserController.editUser)
router.delete('/delete-users/:id',authenticate,adminUserController.deleteUsers)

//FORMS
// router.get('/get-application',authenticate,adminFormController.getApplication);
// router.get('/get-applicationById/:id',authenticate,adminFormController.getApplicationById);

//PENDING
router.get('/get-application',authenticate,adminPendingController.getApplication);
router.get('/get-applicationById/:id',authenticate,adminPendingController.getApplicationById);
router.put('/verify-application/:id',authenticate,adminPendingController.verifyApplication);
router.put('/reject-application/:id',authenticate,adminPendingController.rejectApplication)

//HISTORY
router.get('/get-manager-history',authenticate,managerHistoryController.getApplication);
module.exports = router;