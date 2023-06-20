const ArticleRepository = require('../repositories/articleRepository')

class ArticleService {
  constructor() {
    this.articleRepository = new ArticleRepository();
  }

  async newArticle(info) {
    await this.articleRepository.newArticle(info);
  }

  getAllArticle(page, perPage) {
    return this.articleRepository.getAllArticle(page, perPage);
  }

  getArticleWithComment(articleId) {
    return this.articleRepository.getArticleWithComment(articleId);
  }

  modifyArticle(articleId, title, content) {
    return this.articleRepository.modifyArticle(articleId, title, content);
  }

  countView(articleId) {
    return this.articleRepository.countView(articleId);
  }

  deleteArticle(articleId) {
    return this.articleRepository.deleteArticle(articleId);
  }
}

module.exports = ArticleService;