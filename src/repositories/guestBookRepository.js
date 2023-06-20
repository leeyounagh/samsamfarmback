const { Repository } = require("./index");

class GuestBookRepository extends Repository {
  constructor() {
    super();
    this.table = "guest_books";
  }

  createGuestBook(info) {
    return this.db(this.table).insert({
      user_id: info.user_id,
      content: info.content,
      writer: info.writer,
    });
  }

  getGuestBook(userId) {
    return this.db(this.table)
      .select("guest_books.*")
      .from("guest_books")
      .where({ user_id: userId });
  }
  modifyGuestBook(guestBookId, content) {
    return this.db(this.table).where("id", guestBookId).update({ content });
  }
  async deleteGuestBookById(guestBookId) {
   await this.db(this.table).where("id", guestBookId).update({
     deleted_at: new Date(),
   }); 
  }
}

module.exports = GuestBookRepository;