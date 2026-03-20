const models = require("../models");
const BaseRepository = require("./BaseRepo");

class BookingRepository extends BaseRepository {

    constructor() {
        super(models.bookings);
    }

    async getAllBookings() {
        return await this.model.findAll({
            include: [
                {model: models.customers, as: "customer", attributes: ["full_name"]},
                {model: models.rooms, as: "room",attributes: ["room_number"]},
                {model: models.booking_status, as: "status", attributes: ["name"]},
            ]
        });
    }

    async findByCustomer(customerId) {
        return await this.model.findAll({
            where: {customer_id: customerId}
        });
    }

}

module.exports = new BookingRepository();