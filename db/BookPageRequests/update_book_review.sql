update book_reviews
set review = ${review}
where user_id = ${id} and book_id = ${bookId}
returning review, rating