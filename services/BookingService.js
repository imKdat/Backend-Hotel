const bookingRepo = require('../repositories/BookingRepo')
const AppError = require("../utils/AppError");

class BookingService {
    async getBookings() {
        const bookings = await bookingRepo.getAllBookings()
        return bookings.map(b => ({
            id: b.id,
            customer: b.customer?.full_name,
            roomNumber: b.room?.room_number,
            checkIn: b.check_in,
            checkOut: b.check_out,
            status: b.status?.name,
            statusId: b.status_id,
            createdAt: b.created_at,
        }));
    }
}

module.exports = new BookingService();