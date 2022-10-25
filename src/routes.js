const { addBookHandler, getAllBooksHandler, getBookDetail } = require('./handler');

const routes = [
  // Add book
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },

  // Get all books
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },

  // Get single book detail
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookDetail,
  },
];

module.exports = routes;
