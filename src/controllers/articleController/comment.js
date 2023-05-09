const express = require("express");

module.exports = (connection) => {
  const router = express.Router();
  // 댓글 생성
  /**
   * @swagger
   * /api/article/comment:
   *   post:
   *     summary: 새로운 댓글 작성
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/comments'
   *     responses:
   *       200:
   *         description: 새로운 댓글 작성 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/comments'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.post("/", async (req, res, next) => {
    try {
      const { article_id, content, user_id } = req.body;
      const result = await connection
        .promise()
        .query(
          `INSERT INTO comments (article_id, content, user_id) VALUES ((SELECT id FROM articles WHERE id = ?), ?, ?)`,
          [article_id, content, user_id]
        );
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  });

  // 댓글 수정
  /**
   * @swagger
   * /api/article/comment/:comment-id:
   *   patch:
   *     summary: 특정 댓글 수정
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/comments'
   *     parameters:
   *       - name: comment-id
   *         in: query
   *         required: true
   *         description: 댓글의 id
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/comments'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.patch("/:comment-id", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });
  // 댓글 삭제
  /**
   * @swagger
   * /api/article/comment/:comment-id:
   *   delete:
   *     summary: 특정 댓글 수정
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/comments'
   *     parameters:
   *       - name: comment-id
   *         in: query
   *         required: true
   *         description: 댓글의 id
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/comments'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.delete("/:comment-id", async (req, res, next) => {
    try {
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });
  return router;
};
