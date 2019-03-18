delete
from user_wish_list
where user_id = $1 and book_id = $2;

select bd.title, bd.img, bd.isbn, bd.id
from book_database bd 
join user_wish_list uwl on uwl.book_id = bd.id
join users u on u.id = uwl.user_id
where u.id=$1