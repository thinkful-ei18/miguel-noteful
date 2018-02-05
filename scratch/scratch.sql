-- SELECT * FROM restaurants WHERE id =8008;


--limiting results

-- SELECT id, name FROM restaurants LIMIT 3; 

-- SELECT id, name FROM restaurants
--   WHERE borough = 'Bronx'
--   AND cuisine = 'Japanese'
--   ORDER BY name ASC
--   LIMIT 10;

-- tell how many in table
-- SELECT count(*) from grades;

-- tell how many indian restaurants there are 
-- SELECT count(*) from restaurants
--   WHERE cuisine = 'Indian'
--   AND borough = 'Manhattan';

-- updates all french restos to la cuisine...
-- UPDATE restaurants
--   SET cuisine = 'la cuisine Française'
--   WHERE cuisine = 'French'

-- updates a specific 15000;
-- UPDATE restaurants
--   SET name = 'Foo Bar''s'
--   WHERE id = 15000;



-- DELETE FROM grades WHERE grade = 'Z';

-- DELETE from restaurants WHERE id = 1;

-- CREATE TABLE customers(
--   id serial PRIMARY KEY,
--   modified timestamp DEFAULT current_timestamp,
--   first_name text,
--   last_name text NOT NULL
-- )

-- ALTER TABLE customers
--   ADD COLUMN nick_name text, 
--   DROP COLUMN first_name;


-- ALTER TABLE customers
--   RENAME COLUMN modified TO modified_as_of;

-- DROP TABLE customers;





-- ==== these are for the drills == 
--1 GET all RESTO 
-- SELECT * FROM restaurants

--2 Get Italian restaurants
-- SELECT * FROM restaurants WHERE cuisine ='Italian';

--3 Get 10 Italian restos subset fields and limit 
-- SELECT id, name FROM restaurants 
-- WHERE cuisine = 'Italian'
-- LIMIT 10; 

--4 Get the thai restos 
-- SELECT COUNT(*) FROM restaurants WHERE cuisine = 'Thai';

--5 Count of Restos
-- SELECT COUNT(*) FROM restaurants;

--6 Count of Thai restaurants in zip code
-- SELECT COUNT(*) FROM restaurants where address_zipcode = '11372';

--7 
-- SELECT id, name, address_zipcode FROM restaurants 
--   WHERE address_zipcode = '10012'
--   OR address_zipcode = '10013'
--   OR address_zipcode ='10014'
--   ORDER BY name ASC;
--   LIMIT 10;

--8 
-- INSERT INTO restaurants 
-- (name,borough,cuisine,address_building_number,address_street,address_zipcode)
-- VALUES 
-- ('Prince Taco','Queens','Mexican','620','Astoria Boulevard','11372')
-- RETURNING id, name;


--9  and 10 
-- INSERT INTO restaurants 
-- (name,borough,cuisine,address_building_number,address_street,address_zipcode)
-- VALUES 
-- ('king burger 2','Queens','American','667','Ocean BLVD','11372'),
-- ('king burger 3','Queens','American','667','Ocean BLVD','11372'),
-- ('king burger 4','Queens','American','667','Ocean BLVD','11372')
-- RETURNING id, name;

--11 
-- UPDATE restaurants
--   SET name = 'DJ REYSNOLDS PUB N RESTO'
--   WHERE nyc_restaurant_id ='30191841';

--12
-- DELETE FROM grades WHERE id = '10';

--13
-- DELETE FROM restaurants WHERE id ='22';
-- 2018-02-05 12:02:05.992 PST [5463] ERROR:  update or delete on table "restaurants" violates foreign key constraint "grades_restaurant_id_fkey" on table "grades"
-- 2018-02-05 12:02:05.992 PST [5463] DETAIL:  Key (id)=(22) is still referenced from table "grades".
-- 2018-02-05 12:02:05.992 PST [5463] STATEMENT:  DELETE FROM restaurants WHERE id ='22';
-- psql:./scratch/scratch.sql:114: ERROR:  update or delete on table "restaurants" violates foreign key constraint "grades_restaurant_id_fkey" on table "grades"
-- DETAIL:  Key (id)=(22) is still referenced from table "grades".
--14
-- CREATE TABLE inspectors(
--   id serial PRIMARY KEY,
--   first_name text NOT NULL,
--   last_name text NOT NULL,
--   borough borough_options
-- )

--15
-- ALTER TABLE grades
--   ADD COLUMN notes text;
--   DROP TABLE inspectors;

