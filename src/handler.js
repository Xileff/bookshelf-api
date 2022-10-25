const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const body = request.payload;

  // Case : Request body tidak memiliki 'name'
  if (!Object.hasOwn(body, 'name')) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  // Case : readPage > pageCount
  if (body.readPage > body.pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  // Coba memasukkan buku
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length === 1;

  // Case : Buku berhasil dimasukkan
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  // Case : Buku gagal dimasukkan karena generic error
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({ id: book.id, name: book.name, publisher: book.publisher })),
    },
  });

  response.code(200);
  return response;
};

const getBookDetail = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((b) => b.id === bookId);

  // Case : Buku tidak ditemukan
  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
  }

  // Case : Buku ditemukan
  const response = h.response({
    status: 'success',
    data: {
      book: books[index],
    },
  });

  response.code(200);
  return response;
};

const updateBook = (request, h) => {
  const body = request.payload;
  // Case : Payload tidak memiliki properti name
  if (!Object.hasOwn(body, 'name')) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  // Case : Payload memiliki readPage > readCount
  if (body.readPage > body.pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  // Case : Payload memiliki id yang tidak ditemukan oleh server
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);
  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });

    response.code(404);
    return response;
  }

  // Proses update
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  // Update buku
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });

  response.code(200);
  return response;
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;

  // Case : Id tidak ditemukan
  const index = books.findIndex((b) => b.id === bookId);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });

    response.code(404);
    return response;
  }

  // Proses hapus buku
  books.splice(index, 1);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });

  response.code(200);
  return response;
};

module.exports = {
  addBookHandler, getAllBooksHandler, getBookDetail, updateBook, deleteBook,
};
