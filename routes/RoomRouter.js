const express=require('express');
const router=express.Router();
const roomController=require('../controllers/RoomController')

router.get("/",roomController.getAllRooms)
router.post("/",roomController.createRoom)
router.get("/:id",roomController.getById)
router.patch("/:id",roomController.updateRoom)
router.delete("/:id",roomController.deleteRoom)
module.exports = router;