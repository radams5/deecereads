delete
from user_library 
where user_id = $1 and book_id = $2;

select bd.title, bd.img, bd.isbn , bd.id
from book_database bd 
join user_library ul on ul.book_id = bd.id
join users u on u.id = ul.user_id
where u.id=$1