const { BadRequest } = require("../errors");
const bcrypt = require('bcrypt');

/**
 * @swagger
 * components:
 *   dtos:
 *     CreateUserRequestDTO:
 *       type: object
 *       requestBody:
 *         description: 회원가입시 필요한 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 name:
 *                   type: string
 *                 nickname: 
 *                   type: string
 *                 mbti:
 *                   type: string
 *                 phone:
 *                   type: string
 *             example:
 *               email: abc@abc.com
 *               name: 온호성
 *               nickname: 핸섬호성
 *               password: thisispassword
 *               mbti: ENFP
 *               phone: '01012343214'
 */
class CreateUserRequestDTO {
    email;
    name;
    nickname;
    password;
    mbti;
    phone;
    created_at;
    updated_at;    

    constructor(data)
    {
        if (data.email === undefined || data.password === undefined || data.phone === undefined || data.mbti === undefined
            || data.nickname === undefined || data.name === undefined) {
                throw new BadRequest("Missing Parameter");
            }

            this.email = data.email;
            this.password = bcrypt.hashSync(data.password, 10);
            this.name = data.name;
            this.nickname = data.nickname;
            this.mbti = data.mbti;
            this.phone = data.phone;
            this.created_at = new Date();
            this.updated_at = new Date();
    }
}

/**
 * @swagger
 * components:
 *   dtos:
 *     LoginUserRequestDTO:
 *       type: object
 *       requestBody:
 *         description: 로그인 시 필요한 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *             example:
 *               email: 'abc@abc.com'
 *               password: 'thisispassword'
 */
class LoginUserRequestDTO {
    email;
    password;

    constructor(data)
    {
        if (data.email === undefined || data.password === undefined) {
                throw new BadRequest("Missing Parameter");
            }

            this.email = data.email;
            this.password = data.password;
    }
}

/**
 * @swagger
 * components:
 *   dtos:
 *     LoginUserResponseDTO:
 *       properties:
 *         id:
 *           type: int
 *           description: 로그인을 성공한 유저의 아이디
 *         email:
 *           type: string
 *           description: 로그인을 성공한 유저의 이메일
 *         name:
 *           type: string
 *           description: 로그인을 성공한 유저의 이름
 *         nickname:
 *           type: string
 *           description: 로그인을 성공한 유저의 닉네임
 *       example:
 *         id: 1
 *         email: abc@abc.com
 *         name: 온호성
 *         nickname: 핸섬호성
 */
class LoginUserResponseDTO {
    id;
    email;
    name;
    nickname;

    constructor(data)
    {
        this.id = data.id;
        this.email = data.email;
        this.name = data.name;
        this.nickname = data.nickname;
    }
}


/**
 * @swagger
 * components:
 *   dtos:
 *     UpdateUserRequestDTO:
 *       type: object
 *       parameters:
 *         pathParam:
 *           name: id
 *           in: path
 *           description: 유저 ID
 *           required: true
 *           schema:
 *             $ref: "#/components/schemas/users/properties/id"
 *       requestBody:
 *         description: 유저 업데이트 시 필요한 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 nickname:
 *                   type: string
 *                 password:
 *                   type: string
 *                 mbti:
 *                   type: string
 *                 phone:
 *                   type: string
 *             example:
 *               name: '온호성'
 *               nickname: '핸섬호성'
 *               password: 'modifiedpassword'
 *               mbti: 'ESFP'
 *               phone: '01012341234'
 */
class UpdateUserRequestDTO {
    id;
    name;
    nickname;
    password;
    mbti;

    constructor(id, data)
    {
        if (id === undefined || data.password === undefined || data.phone === undefined
            || data.name === undefined || data.nickname === undefined || data.mbti === undefined) {
                throw new BadRequest("Missing Parameter");
            }

            this.id = id;
            this.name = data.name;
            this.nickname = data.nickname
            this.password = bcrypt.hashSync(data.password, 10);
            this.mbti = data.mbti;
            this.phone = data.phone;
            this.updated_at = new Date();
    }
}

/**
 * @swagger
 * components:
 *   dtos:
 *     UserDTO:
 *       properties:
 *         id:
 *           type: int
 *           description: 유저의 아이디
 *         email:
 *           type: string
 *           description: 유저의 이메일
 *         name:
 *           type: string
 *           description: 유저의 이름
 *         nickname:
 *           type: string
 *           description: 유저의 닉네임
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
 *         id: 1
 *         email: abc@abc.com
 *         name: 온호성
 *         nickname: 핸섬호성
 *         mbti: 'ISTJ'
 *         phone: '01012341234'
 *         created_at: '2023-05-05T15:35:37.000Z'
 *         updated_at: '2023-05-05T15:35:37.000Z'
 *         deleted_at: '2023-05-05T15:35:37.000Z'
 */
class UserDTO {
    id;
    email;
    name;
    nickname;
    mbti;
    phone;
    created_at;
    updated_at;
    dleeted_at;

    constructor(data)
    {
        this.id = data.id;
        this.email = data.email;
        this.mbti = data.mbti;
        this.name = data.name;
        this.nickname = data.nickname;
        this.phone = data.phone;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.deleted_at = data.deleted_at;
    }
}

module.exports = {
    CreateUserRequestDTO,
    UserDTO,
    UpdateUserRequestDTO,
    LoginUserRequestDTO, 
    LoginUserResponseDTO
}