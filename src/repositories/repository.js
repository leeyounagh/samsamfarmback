module.exports = class Repository {
    constructor(db) {
        this.db = db;
    }

    __findByPrimaryKey(table, id) {
        return this.db(table).where("id", id).first();
    }
}