const { Repository } = require("./index");
const { BadRequest } = require("../errors");
class ArticleRepository extends Repository {
  constructor() {
    super();
    this.table = "articles";
  }
  async findById(id) {
    return this.__findByPrimaryKey(this.table, id);
  }
  async newArticle(info) {
    await this.db(this.table).insert({
      user_id: info.user_id,
      title: info.title,
      content: info.content,
    });
  }
  async getArticleWithComment(article_id) {
    const result = await this.db(this.table)
      .join("comments", "articles.id", "=", "comments.article_id")
      .join("users", "comments.user_id", "=", "users.id")
      .select(
        "articles.title",
        "articles.content",
        "articles.created_at as article_created_at",
        "articles.view_count",
        "comments.content as comment",
        "comments.created_at as comment_created_at",
        "comments.id as comment_id",
        "users.nickname as nickname",
        "users.id as user_id"
      )
      .where("articles.id", article_id);
    console.log(result);
    return result;
  }

  getAllArticle(page, perPage) {
    const offset = (page - 1) * perPage;

    return this.db(this.table)
      .join("users", "articles.user_id", "=", "users.id")
      .select(
        "articles.id",
        "articles.user_id",
        "articles.title",
        "articles.content",
        "articles.view_count",
        "articles.created_at",
        "articles.updated_at",
        "articles.deleted_at",
        "users.nickname"
      )
      .orderBy("articles.created_at", "desc")
      .limit(perPage)
      .offset(offset);
  }

  async modifyArticle(article_id, title, content) {
    try {
      //const article = await findById(article_id);
     // if (!article) {
      //  throw new BadRequest("Article not found");
     // }
      await this.db(this.table).where("id", article_id).update({
        title,
        content
      });
    } catch (err) {
      next(err);
    }
  }

  async countView(articleId) {
    try {
      await this.db(this.table)
        .where("id", articleId)
        .increment("view_count", 1);
    } catch (err) {
      next(err);
    }
  }

  async deleteArticle(article_id) {
    try {
      await this.db(this.table).where("id", article_id).update({
        deleted_at: new Date(),
      });

    } catch (err) {
      next(err);
    }
  }
}

module.exports = ArticleRepository;

