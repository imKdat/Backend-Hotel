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
    async getRoomById(id) {
        const room = await roomRepository.findByRoomID(id);

        if (!room) {
            throw new AppError("Room not found", 404);
        }

        return {
            id: room.id,
            roomNumber: room.room_number,
            roomType: room.room_type?.name,
            status: room.status?.name
        };
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

        const room = await roomRepository.create({
            room_number: roomNumber,
            room_type_id: roomTypeId,
            status_id: statusId
        });

        return  {room,message: "Creat successfully"}

    }
    async updateRoom(id, data) {
        const { roomNumber, roomTypeId, statusId } = data;

        // 1. Check tồn tại
        const existingRoom = await roomRepository.findById(id);
        if (!existingRoom) {
            throw new AppError("Room not found", 404);
        }

        // 2. Check trùng roomNumber (nếu có truyền lên)
        if (roomNumber) {
            const roomExist = await roomRepository.findByRoomNumber(roomNumber);

            if (roomExist && roomExist.id !== id) {
                throw new AppError("Room number already exists", 409);
            }
        }

        // 3. Update
        await roomRepository.update(id, {
            room_number: roomNumber ?? existingRoom.room_number,
            room_type_id: roomTypeId ?? existingRoom.room_type_id,
            status_id: statusId ?? existingRoom.status_id
        });

        // 4. Lấy lại data sau update (có include)
        const updatedRoom = await roomRepository.findByRoomID(id);

        // 5. Map response
        return {
            id: updatedRoom.id,
            roomNumber: updatedRoom.room_number,
            roomType: updatedRoom.room_type?.name,
            status: updatedRoom.status?.name
        };
    }
    async deleteRoom(id) {
        const room = await roomRepository.findById(id);
        if (!room) {
            throw new AppError("Room not found", 404);
        }
        await roomRepository.delete(id);
        return {message: "Deleted successfully"}
    }

}

module.exports = new RoomService();