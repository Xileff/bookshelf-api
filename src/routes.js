const {
  addBookHandler, getAllBooksHandler, getBookDetail, updateBook,
} = require('./handler');

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

  // Update book
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
];

module.exports = routes;
