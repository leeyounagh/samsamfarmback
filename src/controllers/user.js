// 유저 정보 (/user)

const express = require("express");
const UserService = require("../services/userService");
const { UserDTO, UpdateUserRequestDTO } = require("../dtos/userDto");
const { InternalServerError } = require("../errors");

module.exports = () => {
  const router = express.Router();
  const userService = new UserService();

  /**
   * @swagger
   * /api/user/{id}:
   *   get:
   *     summary: 유저 정보를 ID 기반으로 반환
   *     tags: [user]
   *     parameters:
   *       - name: id
   *         in: path
   *         description: 유저 ID
   *         required: true
   *         schema:
   *           $ref: "#/components/schemas/users/properties/id"
   *     responses:
   *       200:
   *         description: 성공.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/dtos/UserDTO'
   *       400:
   *         description: Invalid User Id.
   *       500:
   *         description: Server Error.
   */
  router.get("/:id", async (req, res, next) => {
    try {
      const user = new UserDTO(await userService.findUserByUserId(req.params.id));

      res.json(user);
    } catch (error) {
      next(error);
    }
  });

  /**
   * @swagger
   * /api/user/{id}:
   *   put:
   *     summary: 유저 정보를 ID 기반으로 수정
   *     tags: [user]
   *     parameters:
   *       - $ref: '#/components/dtos/UpdateUserRequestDTO/parameters/pathParam'
   *     requestBody:
   *       $ref: '#/components/dtos/UpdateUserRequestDTO/requestBody'
   *     responses:
   *       200:
   *         description: 성공.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/dtos/UserDTO'
   *       400:
   *         description: Invalid User Id.
   *       500:
   *         description: Server Error.
   *
   */
  router.put("/:id", async (req, res, next) => {
    try {
        const user = new UpdateUserRequestDTO(req.params.id, req.body);
        const result = new UserDTO(await userService.updateUser(user));

        res.json(result); 
    }catch (error) {
        next(error);
    }
  });

  
  /**
   * @swagger
   * /api/user/{id}:
   *   delete:
   *     summary: 유저 정보를 ID 기반으로 반환
   *     tags: [user]
   *     parameters:
   *       - name: id
   *         in: path
   *         description: 유저 ID
   *         required: true
   *         schema:
   *           $ref: "#/components/schemas/users/properties/id"
   *     responses:
   *       200:
   *         description: 성공.
   *       400:
   *         description: Invalid User Id.
   *       500:
   *         description: Server Error.
   */
  router.delete("/:id", async (req, res, next) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        if(result == 1) {
            res.json({"message":"User Delete Success"});
        }
        else {
            throw new InternalServerError("User Delete Failed");
        }
    }catch (error) {
        next(error);
    }
  });
  return router;
};
