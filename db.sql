-- create database command
create database bookDB


-- connected to database

\c [database_name]


-- check table

\dt

-- create table

CREATE TABLE BOOK(
    id VARCHAR(255) PRIMARY KEY,
    NAME VARCHAR(20) ,
    DESCRIPTION VARCHAR(255)
);



-- inset data to table (create operation)
-- values will be add the new books description
-- insert  into as always add new row
-- we can add multiple rows at once

INSERT INTO BOOK(id,NAME,DESCRIPTION)
VALUES(101,The Last Circle,You have to read this books.Than you can understand what this books for);




-- add multiple row and record


INSERT INTO BOOK(id,NAME,DESCRIPTION)
VALUES(101,The Last Circle,You have to read this books.Than you can understand what this books for),
VALUES(101,The Last Circle,You have to read this books.Than you can understand what this books for),
VALUES(101,The Last Circle,You have to read this books.Than you can understand what this books for);





-- Get/Read operations

SELECT * FROM book

-- single properties ger/read operations

SELECT (id,description,name) FROM book



-- get specific book

SELECT * FROM book WHERE id="value"


-- delete a specific books

DELETE  FROM book WHERE id="value"


-- update a specific book

UPDATE book SET name="value", description="value" WHERE id="value"
