const { BadRequest } = require("../errors");

const GuestBookRepository = require("../repositories/guestBookRepository")

class GuestBookService {
  constructor() {
    this.guestBookRepository = new GuestBookRepository();
  }

  createGuestBook(info) {
    return this.guestBookRepository.createGuestBook(info);
  }

  getGuestBook(userId) {
    return this.guestBookRepository.getGuestBook(userId);
  }

  modifyGuestBook(guestBookId, content) {
    return this.guestBookRepository.modifyGuestBook(guestBookId, content);
  }
  deleteGuestBookById(guestBookId) {
    return this.guestBookRepository.deleteGuestBookById(guestBookId);
  }
}

module.exports = GuestBookService;