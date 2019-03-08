update book_reviews
set rating = ${rating}
where user_id = ${id} and book_id = ${bookId}
returning rating, review