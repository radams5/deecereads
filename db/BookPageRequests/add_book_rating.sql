insert into book_reviews (user_id, book_id, rating)
values  (${id}, ${bookId}, ${rating})  
returning rating, review 