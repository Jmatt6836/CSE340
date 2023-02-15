INSERT INTO "client" (client_firstname, client_lastname, 
		 client_email, client_password)
		VALUES ('Tony', 'Stark', 
		 'tony@starkent.com', 'Iam1ronM@n')


UPDATE "client" SET client_type = 'Admin'
WHERE client_id = 1;
SELECT * FROM "client" WHERE client_id = 1;

DELETE from "client" WHERE client_id = 1;

UPDATE inventory
SET inv_description = REPLACE(
	inv_description,
	'the small interiors',
	'a huge interior'
)
WHERE inv_id = 10;

SELECT
	inv_make,
	inv_model,
	classification_name
FROM 
	inventory
INNER JOIN classification
	on classification.classification_id = inventory.classification_id
WHERE classification_name = 'Sport';

update inventory
SET 
	inv_image = REPLACE(inv_image,'/images/','/images/vehicles/'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/')
	;
