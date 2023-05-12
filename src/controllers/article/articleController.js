const express = require("express");

module.exports = (connection) => {
  const router = express.Router();
  /**
   * @swagger
   * /api/v1/article:
   *   post:
   *     summary: 새로운 게시물 작성
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/articles'
   *     responses:
   *       200:
   *         description: 새로운 개시물 작성 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/articles'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.post("/", async (rep, res, next) => {
    try {
      const { title, content } = req.body;
      const result = await connection.query(
        `INSERT INTO posts (title, content) VALUES (?, ?)`,
        [title, content]
      );
      console.log(result);

      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });
  /**
   * @swagger
   * /api/v1/article:
   *   get:
   *     summary: 전체 게시물을 불러오는 api 입니다
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/articles'
   *     responses:
   *       200:
   *         description: 게시물 조회 완료.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/articles'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.get("/", (req, res) => {
    res.json({ data: "ok" });
  });

  /**
   * @swagger
   * /api/v1/article/:article-id:
   *   get:
   *     summary: 해당 게시물 id의 게시물과 댓글 불러오기
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/article_with_commets'
   *     parameters:
   *       - name: article-id
   *         in: query
   *         required: true
   *         description: 게시물의 id
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/article_with_commets'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.get("/:article-id", (req, res) => {
    res.json({ data: "ok" });
  });
  /**
   * @swagger
   * /api/v1/article/:article-id:
   *   patch:
   *     summary: 특정 게시물 수정
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/articles'
   *     parameters:
   *       - name: article-id
   *         in: query
   *         required: true
   *         description: 게시물의 id
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/articles'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.patch("/:article-id", (req, res) => {
    res.json({ data: "ok" });
  });
  // 게시물 삭제
  /**
   * @swagger
   * /api/v1/article/:article-id:
   *   delete:
   *     summary: 특정 게시물 삭제
   *     tags: [article]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/articles'
   *     parameters:
   *       - name: article-id
   *         in: query
   *         required: true
   *         description: 게시물의 id
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/articles'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   */
  router.delete("/:article-id", (req, res) => {
    res.json({ date: "ok" });
  });

  router.use("/comment", require("./commentController")(this.connection));
  
  return router;
};