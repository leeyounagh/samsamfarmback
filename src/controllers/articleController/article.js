const express = require("express");

module.exports = (connection) => {
  const router = express.Router();
  /**
   * @swagger
   
   * /api/article:
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
  router.post("/", async (req, res, next) => {
    try {
      const { title, content, user_id } = req.body;
      await connection
        .promise()
        .query(
          `INSERT INTO articles (title, content,user_id) VALUES (?, ?,?)`,
          [title, content, user_id]
        );

      res.json({ data: "ok" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  /**
   * @swagger
   
   * /api/article:
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
  router.get("/", async (req, res) => {
    try {
      const { page, perPage } = req.query;
      const countResult = await connection
        .promise()
        .query("SELECT COUNT(*) AS count FROM articles");
      const totalCount = countResult[0][0].count; // 결과값이 [ [ { count: 123 } ] ] 와 같은 형태로 반환되므로, [0][0].count로 결과값에 접근합니다.
      const result = await connection
        .promise()
        .query("SELECT * FROM articles LIMIT ?, ?", [
          (page - 1) * perPage,
          parseInt(perPage),
        ]);
      res.json({ data: result[0], totalCount }); // totalCount를 추가하여 응답합니다.
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  });
  /**
   * @swagger
   * /api/article/:article-id:
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
  router.get("/:articleId", async (req, res) => {
    try {
      const { articleId } = req.params;
      const result = await connection
        .promise()
        .query(
          "SELECT * FROM articles LEFT JOIN comments ON articles.id= comments.article_id WHERE articles.id = ?",
          [articleId]
        );

      res.json({ data: result[0] });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  });
  /**
   * @swagger
   * /api/article/:article-id:
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
   * /api/article/:article-id:
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
  router.use("/comment", require("./comment")(this.connection));
  return router;
};
