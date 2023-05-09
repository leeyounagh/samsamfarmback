const knex = require("./dbConnection");

// Reference : https://knexjs.org/guide/schema-builder.html

/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - nickname
 *         - password
 *         - mbti
 *         - phone
 *       properties:
 *         id:
 *           type: number
 *           description: 유저 고유id입니다.
 *         email:
 *           type: string
 *           description: 유저의 이메일입니다.
 *         name:
 *           type: string
 *           description: 유저의 이름입니다.
 *         nickname:
 *           type: string
 *           description: 유저의 닉네임입니다.
 *         password:
 *           type: string
 *           description: 유저의 비밀번호입니다.
 *         mbti:
 *           type: string
 *           enum: ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ']
 *           description: mbti 16종류입니다.
 *         phone:
 *           type: string
 *           description: 유저의 전화번호입니다
 *         created_at:
 *           type: string
 *           format: date
 *           description: 유저 생성날짜입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 유저 정보 업데이트 날짜입니다 .
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 유저 정보가 삭제된 날짜입니다.
 *       example:
 *         id: 4
 *         email: 5
 *         name: 온호성
 *         nickname: 핸섬호성
 *         password: thisispassword
 *         mbti: ENFP
 *         phone: 01012343214
 *         createdAt: 2023-05-03 20:24:43
 *         updated_at: 2023-05-04 20:24:43
 *         deleted_at:  2023-05-05 20:24:43
 */
module.exports = knex.schema.hasTable('Users').then( (exists) => {
    if (!exists) {
        return knex.schema.createTable('Users', t => {
            t.increments('id').primary()
            t.string('email', 20).notNullable()
            t.string('name', 20).notNullable()
            t.string('nickname', 20).notNullable()
            t.string('password', 60).notNullable() // 60 is bcrypt encoded password length
            t.string('mbti', 4).notNullable()
            t.string('phone', 15).notNullable()
            t.datetime('created_at')
            t.datetime('updated_at')
            t.datetime('deleted_at')
            t.unique('email')
        });
    }
});
