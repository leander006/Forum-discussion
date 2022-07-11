const express = require('express');
const { like, unLike } = require('../controllers/mediaController');
const { createReply, getReply, getParticularReply, deleteReply, createComment, deleteComments } = require('../controllers/replyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post("/:id",protect,createReply)
router.get("/",protect,getReply)
router.get("/:id",protect,getParticularReply)
router.post("/comment/:id",protect,createComment)
router.delete("/delete/:id",protect,deleteReply)
router.delete("/deleteComment/:id",protect,deleteComments)
router.put("/likeComment/:id",protect,like)
router.put("/unLikeCommet/:id",protect,unLike)




module.exports = router;