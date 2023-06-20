const express = require("express");

const { CreateArticleDTO, ModifyArticleDTO } = require("../../dtos/articleDto");
const { CommentDTO } = require("../../dtos/commentDto");
const ArticleService = require("../../services/articleService");
const CommentService = require("../../services/commentService");

const router = express.Router();
const articleService = new ArticleService();
const commentService = new CommentService();
  
/**
 * @swagger
 * /api/v1/article:
 *   get:
 *     summary: 모든 게시물 조회
 *     tags:
 *       - article
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: 페이지당 아이템 수 
 *     responses:
 *       200:
 *         description: 모든 게시물 조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       user_id:
 *                         type: number
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       view_count:
 *                         type: number
 *                       created_at:
 *                         type: string
 *                       updated_at:
 *                         type: string
 *                       deleted_at:
 *                         type: string
 *             example:
 *               data:
 *                 - id: 1
 *                   user_id: 123
 *                   title: "게시물 제목"
 *                   content: "게시물 내용"
 *                   view_count: 100
 *                   created_at: "2023-05-14T12:34:56Z"
 *                   updated_at: "2023-05-14T13:45:00Z"
 *                   deleted_at: null
 *                 - id: 2
 *                   user_id: 456
 *                   title: "다른 게시물 제목"
 *                   content: "다른 게시물 내용"
 *                   view_count: 50
 *                   created_at: "2023-05-13T09:12:34Z"
 *                   updated_at: "2023-05-13T11:23:45Z"
 *                   deleted_at: null
 *       400:
 *         description: BAD_REQUEST.
 */

  router.get("/", async (req, res, next) => {
    try {
      const { page, perPage } = req.query;
      const allArticle = await articleService.getAllArticle(page, perPage);
      res.send({ data: allArticle });
    } catch(err) {
      next(err)
    }
  });

/**
 * @swagger
 * /api/v1/article:
 *   post:
 *     summary: 게시물 생성
 *     tags:
 *       - article
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *           example:
 *             user_id: 123
 *             title: "새로운 게시물"
 *             content: "게시물 내용"
 *     responses:
 *       200:
 *         description: 게시물 생성 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   example: ok
 *       400:
 *         description: BAD_REQUEST.
 */
  router.post("/", async (req, res, next) => {
    try {
      const { user_id, title, content } = req.body; 
      const article = new CreateArticleDTO({user_id, title, content});

      await articleService.newArticle(article);
      
      res.json({ data: "ok" });
    } catch (error) {
      next(error);
    }
  });

/**
 * @swagger
 * /api/v1/article/{articleId}:
 *   get:
 *     summary: 게시물 id 기준으로 해당 게시물과, 댓글 조회
 *     tags: [article]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: article_id
 *         schema:
 *           type: number
 *         required: true
 *         description: 게시물 ID
 *     responses:
 *       200:
 *         description: 게시물 데이터, 댓글 조회 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     article_created_at:
 *                       type: string
 *                     view_count:
 *                       type: number
 *                     comment:
 *                       type: string
 *                     comment_created_at:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     user_id:
 *                       type: number  
 *             example:
 *               data:
 *                 title: "게시물 제목"
 *                 content: "게시물 내용"
 *                 article_created_at: "2023-05-14T12:34:56Z"
 *                 view_count: 100
 *                 comment: "댓글 내용"
 *                 comment_created_at: "2023-05-15T09:12:34Z"
 *                 nickname: "이어진"
 *                 user_id: 13
 *       400:
 *         description: BAD_REQUEST.
 */
  router.get("/:articleId", async(req, res, next) => {
    try {
      const {articleId} = req.params;

      const getArticleWithComment = await articleService.getArticleWithComment(articleId);
      await articleService.countView(articleId);
      
      res.json({ data: getArticleWithComment });
    
    } catch(err) {
      next(err);
    }
  });

/**
 * @swagger
 * /api/v1/article/{article-id}:
 *   patch:
 *     summary: 게시물 수정 
 *     tags: [article]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *           example:
 *             title: "수정된 제목"
 *             content: "수정된 내용"
 *     responses:
 *       200:
 *         description: 게시물 수정 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   example: modify Success
 *       400:
 *         description: BAD_REQUEST.
 */
  router.patch("/:article_id", async(req, res, next) => {
    try {
      const articleId = req.params.article_id; 
      const { title, content } = req.body;
    
      await articleService.modifyArticle(articleId, title, content);

      res.json({ data: "modify Success" });
    } catch (err) {
      next(err);
    }
  });

/**
 * @swagger
 * /api/v1/article/{article-id}:
 *   delete:
 *     summary: 게시물 삭제 
 *     tags: [article]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: article_id
 *         schema:
 *           type: number
 *         required: true
 *         description: 게시물 ID  
 *     responses:
 *       204:
 *         description: 성공.
 *         content:
 *           application/json:
 *       400:
 *         description: BAD_REQUEST.
 */
  router.delete("/:article_id", (req, res, next) => {
    try {
      const articleId = req.params.article_id;
      articleService.deleteArticle(articleId);
      res.status(204).end();
    } catch(err) {
      next(err);
    }
  });

/**
 * @swagger
 * /api/v1/article/comment:
 *   post:
 *     summary: 댓글 생성
 *     tags: [article]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               article_id:
 *                 type: string
 *               content:
 *                 type: string
 *           example:
 *             user_id: 123
 *             article_id: "abcd1234"
 *             content: "댓글 내용"
 *     responses:
 *       200:
 *         description: 댓글 생성 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   example: ok 
 *       400:
 *         description: BAD_REQUEST.
 */ 
  router.post("/comment", async (req, res, next) => {
    try {
      const { user_id, article_id, content } = req.body; 
      const comment = new CommentDTO({ user_id, article_id, content });
      await commentService.newComment(comment);
      res.json({ data: "ok" });
    } catch(err) {
      next(err);
    }
  })

/**
 * @swagger
 * /api/v1/article/comment/{comment_id}:
 *   patch:
 *     summary: 댓글 수정 
 *     tags: [article]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *           example:
 *             content: "수정된 내용"
 *     responses:
 *       200:
 *         description: 댓글 수정 성공.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   example: modify Success
 *       400:
 *         description: BAD_REQUEST.
 */
 router.patch("/comment/:comment_id", async (req, res, next) => {
   try {
     const commentId = req.params.comment_id;
     const { content } = req.body;

     await commentService.modifyComment(commentId, content);

     res.json({ data: "modify Success" });
   } catch (error) {
     next(error);
   }
 });

/**
 * @swagger
 * /api/v1/article/comment/{comment-id}:
 *   delete:
 *     summary: 댓글 삭제 
 *     tags: [article]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comment-id
 *         schema:
 *           type: number
 *         required: true
 *         description: 댓글 ID  
 *     responses:
 *       204:
 *         description: 성공.
 *         content:
 *           application/json:
 *       400:
 *         description: BAD_REQUEST.
 */
  router.delete("/comment/:comment_id", (req, res, next) => {
    try {
      const commentId = req.params.comment_id;
      commentService.deleteComment(commentId);
      
      res.status(204).end();
    } catch(err) {
      next(err);
    }
  });

module.exports = router;