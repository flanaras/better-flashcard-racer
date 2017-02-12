create database flashcardracer;
use flashcardracer;

CREATE USER 'java'@'localhost' IDENTIFIED BY 'lordofgeese1997';
GRANT SELECT, DELETE, INSERT ON flashcardracer.* TO 'java'@'localhost';

create table users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20),
    password VARCHAR(30)
);

create table decks (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(40),    /*40 characters description length max*/
    difficulty INTEGER,         /*Example: 0 = easy, 1 = medium, 2 = hard etc(?)*/
    created_by INTEGER,
    FOREIGN KEY (created_by) REFERENCES users (id)
);

create table card (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    problem VARCHAR(20)
);

create table deck_card_dep (
    deck_id INTEGER,
    card_id INTEGER,
    FOREIGN KEY (deck_id) REFERENCES decks (id),
    FOREIGN KEY (card_id) REFERENCES card (id)
);
