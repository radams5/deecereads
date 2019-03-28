INSERT INTO user_library (user_id, book_id)
VALUES (${id}, ${bookId})
returning * from user_library
