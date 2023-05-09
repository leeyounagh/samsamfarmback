const { BadRequest, InternalServerError } = require('../errors');
const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');


module.exports = class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    findUserByUserId(id) {
        return this.repository.findById(id);
    }

    createUser(user) {
        return this.repository.createUser(user);
    }

    async loginUser(user) {
        const result = await this.repository.findByEmail(user.email);
        console.log(result);
        if(result == undefined) throw new BadRequest("Not Found User");
        
        const passwordCheck = bcrypt.compareSync(user.password, result.password);
        if(!passwordCheck) throw new BadRequest("No Matched Password");

        return result;
    }

    async updateUser(user) {
        const result = await this.repository.updateUser(user);
        
        if (result == 1) {
            const userData = this.findUserByUserId(user.id);
            return userData;
        }
        else {
            throw new InternalServerError("Update Failed");
        }
    }

    deleteUser(user) {
        const result = this.repository.deleteUser(user);
        return result;
    }
}