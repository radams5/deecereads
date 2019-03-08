select *
from book_database bd 
join user_library ul on ul.book_id = bd.id
join users u on u.id = ul.user_id
where u.id = 18 and isbn = 9781781102459