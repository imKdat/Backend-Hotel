const models = require("../models");
const BaseRepository = require("./BaseRepo");

class UserRepository extends BaseRepository {

    constructor() {
        super(models.users);
    }

    async findByUsername(username) {
        return await this.model.findOne({
            where: { username }
        });
    }
    async updatePassword(id, password) {
        return this.model.update(
            { password },
            { where: { id } }
        );
    }
}

module.exports = new UserRepository();