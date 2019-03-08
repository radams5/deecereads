select g.group_name, g.img, g.id
from groups_users gu
join groups g on gu.group_id = g.id
join users u on u.id = gu.user_id
where u.id = ${id}