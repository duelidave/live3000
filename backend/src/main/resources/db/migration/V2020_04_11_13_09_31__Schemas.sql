CREATE TABLE agency
(
    id   int          NOT NULL GENERATED ALWAYS AS IDENTITY,
    name varchar(255) NOT NULL,
    CONSTRAINT agency_pk PRIMARY KEY (id)
);

CREATE TABLE users
(
    id       int          NOT NULL GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email    VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    enabled  int          NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
);

CREATE TABLE authorities
(
    id        int          NOT NULL GENERATED ALWAYS AS IDENTITY,
    email     VARCHAR(255) NOT NULL,
    authority VARCHAR(255) NOT NULL,
    FOREIGN KEY (email) REFERENCES users (email)
);

CREATE UNIQUE INDEX ix_auth_username
    on authorities (email, authority);