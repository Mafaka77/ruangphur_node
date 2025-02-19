const express = require("express");
const router = express.Router();
const {authenticate} = require("../middlewares/admin_middleware");
const authController = require("../controllers/admin/admin_auth_controller");
const userAuthController = require("../controllers/auth_controller");
const multer=require("multer");
const upload=multer();
//ADMIN ROUTES
router.get("/create-admin",authController.createAdmin);
router.get("/login",authController.login);

// Protected Route (Requires Authentication)
router.get("/me", authenticate, authController.getAuthUser);
//USER ROUTES
router.get("/send-otp",upload.any(),userAuthController.sendOtp);
router.get("/verify-otp",upload.any(),userAuthController.verifyOtp);
router.get("/profile",authenticate,userAuthController.profile);
module.exports = router;