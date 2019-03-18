UPDATE book_reviews
SET rating = ${rating}
WHERE user_id = ${id} and book_id = ${bookId}
returning rating, review