select gu.group_id, gu.user_id, u.username
from groups_users gu
join users u on u.id = gu.user_id
where group_id = ${groupId}