select bd.title, bd.img, bd.isbn 
from book_database bd 
join user_wish_list uwl on uwl.book_id = bd.id
join users u on u.id = uwl.user_id
where u.id=${id}