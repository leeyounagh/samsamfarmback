const Repository = require("./repository");
const dbConnection = require("../models/dbConnection");
const { BadRequest } = require("../errors");

// Reference : https://knexjs.org/guide/query-builder.html

module.exports = class UserRepository extends Repository {
    constructor() {
        super(dbConnection);
        this.table = 'Users';
    }

    async findById(id) {
        const result = await this.__findByPrimaryKey(this.table, id);
        if(result === undefined) throw new BadRequest("Not Found User");
        return result;
    }

    async findByEmail(email) {
        const result = await this.db(this.table).where('email', email).first();
        if (result === undefined) throw new BadRequest("Not Found User");
        return result;
    }

    async createUser(user) {
        const userId = await this.db(this.table).insert(user)
        .catch(error => {
            console.log(String(error));
            if (error.errno == 1062) {
                throw new BadRequest("Create User Failed - Duplicate Email");
            }
            else {
                throw new BadRequest("Create User Failed");
            }
        });

        const result = await this.findById(userId[0]);
        return result;
    }

    async updateUser(user) {
        const result = await this.db(this.table).where('id', user.id)
        .update({
            name: user.name,
            nickname: user.nickname,
            password: user.password,
            mbti: user.mbti,
            phone: user.phone,
            updated_at: user.updated_at
        });

        return result;
    }

    async deleteUser(userId) {
        const result = await this.db(this.table).where('id', userId)
        .update({
            deleted_at: new Date()
        });

        return result;
    }
}