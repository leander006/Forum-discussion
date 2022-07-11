
const express = require('express');

const router = express.Router();

const {allUser, particularUser,groupUser} = require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware');


router.get("/",protect,allUser)
router.get("/oneUser",protect,particularUser)
router.get("/",protect,groupUser)


 
module.exports = router;