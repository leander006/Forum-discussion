
const express = require('express');

const router = express.Router();

const {allUser, particularUser,groupUser} = require("../controllers/userController");



router.get("/",allUser)
router.get("/oneUser",particularUser)
router.get("/",groupUser)


 
module.exports = router;