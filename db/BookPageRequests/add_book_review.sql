insert into book_reviews (user_id, book_id, review)
values  (${id}, ${bookId}, ${review})  
returning review, rating