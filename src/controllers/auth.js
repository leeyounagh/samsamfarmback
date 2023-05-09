// 회원가입 및 로그인 (/auth)
// TODO: sign-in / sign-out
// MBTI 추가 / 수정

const express = require('express');
const UserService = require('../services/userService');
const { CreateUserRequestDTO, UserDTO, LoginUserRequestDTO, LoginUserResponseDTO } = require('../dtos/userDto');

module.exports = (connection) => {
  const router = express.Router();
  const userService = new UserService();

  /**
   * @swagger
   * /api/auth/sign-up:
   *   post:
   *     summary: 유저 회원가입
   *     tags: [auth]
   *     requestBody:
   *       $ref: '#/components/dtos/CreateUserRequestDTO/requestBody'
   *     responses:
   *       200:
   *         description: 회원가입 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/dtos/UserDTO'
   *       400:
   *         description: Invalid Sign-up.
   *       500:
   *         description: Server Error.
   *
   */
  router.post('/sign-up', async (req, res, next) => {
    try {
      const user = new CreateUserRequestDTO(req.body);
      const result = new UserDTO(await userService.createUser(user));

      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   
   * /api/auth/sign-in:
   *   post:
   *     summary: 유저 로그인
   *     tags: [auth]
   *     requestBody:
   *       $ref: '#/components/dtos/LoginUserRequestDTO/requestBody'
   *     responses:
   *       200:
   *         description: 로그인 성공.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/dtos/LoginUserResponseDTO'
   *       400:
   *         description: Invalid Sign-in.
   *       500:
   *         description: Server Error.
   *
   */
  router.post('/sign-in', async (req, res, next) => {
    try {
      const user = new LoginUserRequestDTO(req.body);

      const result = new LoginUserResponseDTO(await userService.loginUser(user));

      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
