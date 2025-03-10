const express = require("express");
const { authenticate, authorizeRoles } = require("../middlewares/admin_middleware");
const authController = require("../controllers/admin/admin_auth_controller");
const multer=require("multer");
const upload=multer();
const router = express.Router();
// router.use(authenticate,authorizeRoles("Admin"));

//ADMIN ROUTES
router.post("/create-admin",authController.createAdmin);
router.post("/login",upload.any(),authController.login);

// Protected Route (Requires Authentication)
router.get("/me", authenticate, authController.getAuthUser);
module.exports = router;