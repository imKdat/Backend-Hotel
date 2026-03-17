const roomRepository = require("../repositories/RoomRepo");
const AppError = require("../utils/AppError");

class RoomService {

    async getAllRooms() {

        const rooms = await roomRepository.getAllRooms();
        return rooms.map(room => ({
            id: room.id,
            roomNumber: room.room_number,
            roomType: room.room_type?.name,
            status: room.status?.name
        }));

    }

    async createRoom(data) {

        const {roomNumber, roomTypeId, statusId} = data;

        if (!roomNumber || !roomTypeId || !statusId) {
            throw new AppError("Missing required fields", 400);
        }

        const exist = await roomRepository.findByRoomNumber(roomNumber);

        if (exist) {
            throw new AppError("Room already exists", 409);
        }

        const {room} = await roomRepository.create({
            roomNumber,
            roomTypeId,
            statusId
        });

        return room;

    }

}

module.exports = new RoomService();