const { Repository } = require("./index");

class CommentRepository extends Repository {
  constructor() {
    super();
    this.table = "comments";
  }
  async newComment(info) {
    await this.db(this.table).insert({
      user_id: info.user_id,
      article_id: info.article_id,
      content: info.content,
    });
  }
  async deleteComment(commentId) {
    await this.db(this.table).where("id", commentId).update({
      deleted_at: new Date(),
    });
  }
  async modifyComment(commentId, content) {
     try {
       await this.db(this.table).where("id", commentId).update({content});
     } catch (err) {
       next(err);
     }
  }
}
module.exports = CommentRepository;