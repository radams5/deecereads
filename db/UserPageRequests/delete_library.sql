delete
from user_library ul 
join book_database bd on ul.book_id = bd.id
join users u on u.id = ul.user_id
where u.id=${id} and isbn = ${isbn}