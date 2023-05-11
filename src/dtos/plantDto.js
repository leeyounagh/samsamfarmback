const { BadRequest } = require("../errors");

/**
 * @swagger
 * components:
 *   dtos:
 *     CreatePlantRequestDTO:
 *       type: object
 *       requestBody:
 *         description: 새로운 작물 생성(배정)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *         current_grade:
 *           type: string
 *           enum: ['1', '2', '3', '4']
 *           description: 작물의 현재 성장 단계 입니다.
 *         plant_type:
 *           type: string
 *           description: 작물의 종류 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 작물이 생성된 날짜 입니다.
 *         plant_grade_update_time:
 *           type: string
 *           format: date
 *           description: 작물 성장단계가 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 작물이 삭제된 날짜 입니다.
 */
class CreatePlantRequestDTO {
  user_id;
  device_id;
  plant_type;

  constructor(data) {
    const { user_id, device_id, plant_type } = data;

    if (
      user_id === undefined ||
      device_id === undefined ||
      plant_type === undefined
    ) {
      throw new BadRequest("Missing Parameter");
    }

    if (typeof user_id !== "number" || user_id < 1) {
      throw new BadRequest("Invalid user_id");
    }

    if (typeof device_id !== "number" || device_id < 1) {
      throw new BadRequest("Invalid device_id");
    }

    if (typeof plant_type !== "string" || plant_type.length > 20) {
      throw new BadRequest("Invalid plant_type");
    }

    this.user_id = user_id;
    this.device_id = device_id;
    this.plant_type = plant_type;
  }
}

/**
 * @swagger
 * components:
 *   dtos:
 *     CreatePlantRequestDTO:
 *       type: object
 *       requestBody:
 *         description: 새로운 작물 생성(배정)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *         id:
 *           type: number
 *           description: 작물 고유 id입니다.
 *         device_id:
 *           type: string
 *           description: 작물에 배정된 디바이스 고유_id 입니다.
 *         user_id:
 *           type: number
 *           description: 작물에 배정된 유저 고유_id 입니다.
 *         current_grade:
 *           type: string
 *           enum: ['1', '2', '3', '4']
 *           description: 작물의 현재 성장 단계 입니다.
 *         plant_type:
 *           type: string
 *           description: 작물의 종류 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 작물이 생성된 날짜 입니다.
 *         plant_grade_update_time:
 *           type: string
 *           format: date
 *           description: 작물 성장단계가 업데이트 된 날짜 입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 작물이 삭제된 날짜 입니다.
 */
class PlantDTO {
  id;
  user_id;
  device_id;
  current_grade;
  plant_type;
  created_at;
  plant_grade_update_time;
  deleted_at;

  constructor(data) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.device_id = data.device_id;
    this.current_grade = data.current_grade;
    this.plant_type = data.plant_type;
    this.created_at = data.created_at;
    this.plant_grade_update_time = data.plant_grade_update_time;
    this.deleted_at = data.deleted_at;
  }
}

module.exports = {
  CreatePlantRequestDTO,
  PlantDTO,
};
