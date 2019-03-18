delete
from user_currently_reading 
where user_id = $1 and book_id = $2;

select bd.title, bd.img, bd.isbn, bd.id
from book_database bd 
join user_currently_reading ucr on ucr.book_id = bd.id
join users u on u.id = ucr.user_id
where u.id=$1
