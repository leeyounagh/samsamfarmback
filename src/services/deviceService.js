/**
 * @swagger
 * components:
 *   schemas:
 *     devices:
 *       type: object
 *       required:
 *         - device_order
 *       properties:
 *         id:
 *           type: number
 *           description: 디바이스 고유id 입니다.
 *         device_order:
 *           type: string
 *           description: 디바이스의 식별 번호 입니다.
 *         user_id:
 *           type: number
 *           description: 해당 디바이스가 배정되어 있는 유저의 고유id 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 디바이스 생성날짜입니다.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: 디바이스 정보 업데이트 날짜입니다 .
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 디바이스 정보 삭제된 날짜입니다.
 *       example:
 *         id: 4
 *         device_order: a7
 *         user_id: 3
 *         createdAt: 2023-05-03 20:24:43
 *         updated_at: 2023-05-04 20:24:43
 *         deleted_at:  2023-05-05 20:24:43
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     device_logs:
 *       type: object
 *       required:
 *         - temperature
 *         - humid
 *         - moisture
 *         - bright
 *       properties:
 *         plant_id:
 *           type: int
 *           description: 해당 측정 로그를 발생시키는 디바이스의 고유id 입니다.
 *         temperature:
 *           type: number
 *           description: 온도 측정 로그 입니다.
 *         humid:
 *           type: number
 *           description: 습도 측정 로그 입니다.
 *         moisture:
 *           type: string
 *           format: date
 *           description: 토양수분 측정 로그 입니다.
 *         bright:
 *           type: string
 *           format: date
 *           description: 조도 측정 로그 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 한번의 디바이스 로그가 측정된 시간 입니다.
 *       example:
 *         plant_id: 4
 *         temperature: 35.5
 *         humid: 59.2
 *         moisture: 78.3
 *         bright: 1200
 *         created_at:  2023-05-05 20:24:43
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     actuators:
 *       type: object
 *       required:
 *         - is_success
 *       properties:
 *         id:
 *           type: number
 *           description: 엑츄에이터 고유id 입니다.
 *         device_id:
 *           type: number
 *           description: 해당 엑츄에이터 제어를 실행시키는 디바이스의 고유id 입니다.
 *         is_success:
 *           type: boolean
 *           description: 엑츄에이터 제어 성공 여부 입니다.
 *         created_at:
 *           type: string
 *           format: date
 *           description: 한번의 엑츄에이터 제어가 실행된 시간입니다.
 *         finished_time:
 *           type: string
 *           format: date
 *           description: 한번의 엑츄에이터 제어 명령이 끝난 시점입니다.
 *         deleted_at:
 *           type: string
 *           format: date
 *           description: 엑츄에이터 제어 정보가 삭제된 날짜입니다.
 *       example:
 *         id: 4
 *         device_id: 5
 *         is_success: true
 *         createdAt: 2023-05-03 20:24:43
 *         finished_time: 2023-05-03 20:26:43
 *         deleted_at:  2023-05-05 20:24:43
 */
