-- User user@email.pass/pass
INSERT INTO users (username, email, password, enabled)
values ('user1',
        'user@email.com',
        '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',
        1);

INSERT INTO authorities (email, authority)
values ('user@email.com', 'ROLE_USER');