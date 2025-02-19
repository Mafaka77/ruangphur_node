const express = require("express");
const router = express.Router();
const {authenticate} = require("../middlewares/auth_middleware");
const multer=require("multer");
const upload=multer();

router.use(authenticate);

module.exports = router;