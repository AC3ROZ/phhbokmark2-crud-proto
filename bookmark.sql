CREATE DATABASE proto_bookmark;
USE proto_bookmark;
CREATE TABLE bookmark (
    `id` int not null auto_increment,
    `url` varchar(8000) not null,
    `page_title` varchar(255) not null,
    `_comment` varchar(255),
    primary key(`id`)
);
