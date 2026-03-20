const bookingService = require('../services/BookingService')

class BookingController {
    async getAllBookings(req, res,next) {
        try{
            const bookings=await bookingService.getBookings()
            res.status(200).json(bookings);
        }
        catch(err){
            next(err);
        }
    }
}
module.exports = new BookingController();