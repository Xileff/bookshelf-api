const {
  addBookHandler, getAllBooksHandler, getBookDetail, updateBook, deleteBook,
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

  // Delete book
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];

module.exports = routes;
