const models = require("../models");
const BaseRepository = require("./BaseRepo");

class CustomerRepository extends BaseRepository {

    constructor() {
        super(models.customers);
    }

    async findWithUser(id) {
        return await this.model.findByPk(id, {
            include: [
                { model: models.users, as: "user" ,attributes: ["username", "email"] },
            ]
        });
    }

}

module.exports = new CustomerRepository();