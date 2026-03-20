const roomService = require('../services/roomService');

class RoomController {
    async createRoom(req, res, next) {
        try {
            const data = req.body;
            const newRoom = await roomService.createRoom(data)
            res.status(200).json(newRoom);
        } catch (error) {
            next(error);
        }
    }

    async getAllRooms(req, res, next) {
        try {
            const rooms = await roomService.getAllRooms();
            res.status(200).json(rooms);
        } catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id=req.params.id;
            const room=await roomService.getRoomById(id)
            res.status(200).json(room);
        }
        catch (error) {
            next(error);
        }
    }
    async updateRoom(req, res, next) {
        try{
            const data = req.body;
            const id=req.params.id;
            const room=await roomService.updateRoom(id,data)
            res.status(200).json(room);
        }catch(error){
            next(error);
        }
    }
    async deleteRoom(req, res, next) {
        try{
            const id = req.params.id;
            const room = await roomService.deleteRoom(id);
            res.status(200).json(room);
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new RoomController();