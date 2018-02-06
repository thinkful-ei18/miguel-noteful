SELECT CURRENT_DATE;

-- CREATE TABLE notes(
--   id serial PRIMARY KEY,
--   title text NOT NULL,
--   content text,
--   created timestamp DEFAULT now()
-- );

-- ALTER SEQUENCE notes_id_seq RESTART WITH 1000 INCREMENT BY 1;


-- INSERT INTO notes 
-- (title,content)
-- VALUES 
-- ('5 life lessons learned from cats','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...'),
-- ('What the government doesn''t want you to know about cats','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...'),
-- ('The most boring article about cats you''ll ever read','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...'),
-- ('7 things lady gaga has in common with cats','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...'),
-- ('he most incredible article about cats you''ll ever read','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...'),
-- ('10 ways cats can help you live to 100','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...'),
-- ('9 reasons you can blame the recession on cats','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...')
-- RETURNING title, content; 

-- DROP TABLE notes;
SELECT * FROM notes

-- SELECT * FROM notes
-- LIMIT 5;

-- SELECT * FROM notes 
-- ORDER BY title ASC;

-- SELECT * FROM notes WHERE title = '5 life lessons learned from cats'

-- SELECT * FROM notes WHERE title LIKE '%you %'


-- INSERT INTO notes 
-- (title,content)
-- VALUES 
-- ('this is a new note not about cats','the content also does not have cats');

-- DELETE FROM notes 
-- WHERE id = 1007