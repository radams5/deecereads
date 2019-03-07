create table user_currently_reading (
user_id integer REFERENCES users(id), 
book_id integer REFERENCES book_database(id)
); 
create table user_wish_list (
user_id integer REFERENCES users(id), 
book_id integer REFERENCES book_database(id)
);
create table user_library (
user_id integer REFERENCES users(id), 
book_id integer REFERENCES book_database(id)
);
create table groups(
id serial primary key,
group_name varchar,
img VARCHAR

);
create table groups_users(
group_id integer REFERENCES groups(id),
user_id INTEGER REFERENCES users(id)

);
create table book_reviews(
id INTEGER PRIMARY KEY,
user_id integer REFERENCES users(id),
book_id integer REFERENCES book_database(id),
review text,
rating INTEGER
);

