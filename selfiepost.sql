create table posts (
    posts_id serial primary key,
    latitude real,
    longitude real,
    mood varchar(255),
    timestamp timestamp
);