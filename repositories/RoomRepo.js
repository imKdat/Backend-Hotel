const models = require("../models");
const BaseRepository = require("./BaseRepo");

class RoomRepository extends BaseRepository {

    constructor() {
        super(models.rooms);
    }

    async getAllRooms() {

        return this.model.findAll({
            include: [
                {
                    model: models.room_types,
                    as: "room_type",
                    attributes: ["id", "name"]
                },
                {
                    model: models.room_status,
                    as: "status",
                    attributes: ["id", "name"]
                }
            ]
        });

    }

    async findByRoomNumber(roomNumber){

        return this.model.findOne({
            where:{
                room_number: roomNumber
            }
        })

    }

}

module.exports = new RoomRepository();