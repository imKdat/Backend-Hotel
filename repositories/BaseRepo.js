class BaseRepository {

    constructor(model) {
        this.model = model;
    }

    async create(data, options = {}) {
        return await this.model.create(data, options);
    }

    async findAll(options = {}) {
        return await this.model.findAll(options);
    }

    async findById(id, options = {}) {
        return await this.model.findByPk(id, options);
    }

    async update(id, data, options = {}) {
        await this.model.update(data, {
            where: { id },
            ...options
        });

        return this.findById(id,options);
    }

    async delete(id) {
        return await this.model.destroy({
            where: { id }
        });
    }

}

module.exports = BaseRepository;