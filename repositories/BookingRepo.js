const models = require("../models");
const BaseRepository = require("./BaseRepo");

class BookingRepository extends BaseRepository {

    constructor() {
        super(models.bookings);
    }

    async getAllBookings() {

        return await this.model.findAll({
            include: [
                { model: models.customers, as: "customer" },
                { model: models.rooms, as: "room" },
                { model: models.booking_status, as: "status" }
            ]
        });

    }

    async findByCustomer(customerId) {

        return await this.model.findAll({
            where: { customer_id: customerId }
        });

    }

}

module.exports = new BookingRepository();