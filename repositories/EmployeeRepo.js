const models = require("../models");
const BaseRepository = require("./BaseRepo");

class EmployeeRepository extends BaseRepository {

    constructor() {
        super(models.employees);
    }

    async findWithUser(id) {
        return await this.model.findByPk(id, {
            include: [
                { model: models.users, as: "user" }
            ]
        });
    }

}

module.exports = new EmployeeRepository();