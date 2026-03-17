const models = require("../models");
const BaseRepository = require("./BaseRepo");

class PaymentRepository extends BaseRepository {

    constructor() {
        super(models.payments);
    }

    async findByBooking(bookingId) {

        return await this.model.findAll({
            where: { booking_id: bookingId }
        });

    }

}

module.exports = new PaymentRepository();