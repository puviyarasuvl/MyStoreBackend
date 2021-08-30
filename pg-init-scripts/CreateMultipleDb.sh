#!/bin/bash

set -e
set -u

function create_user_and_database() {
	local database=$1
	echo " Creating user and database '$database'"
	psql -v ON_ENTER_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
		CREATE USER $database;
		CREATE DATABASE $database;
		GRANT ALL PRIVILEGES ON DATABASE $database TO $database;
	EOSQL
}

function create_schema_and_populate_data() {
	echo "Creating Schema"
	psql -d mystore_db -a -U${POSTGRES_USER} -f /docker-entrypoint-initdb.d/schema.sql

	echo "Populating data"
	psql -d mystore_db -a -U${POSTGRES_USER} <<-EOSQL
		INSERT INTO products (name, price, category, description, url) 
		VALUES 
		('Book', 9.99, 'Readings', 'You can read it!', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
		('Headphones', 249.99, 'Music', 'Listen to stuff!', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
		('Backpack', 79.99, 'Travel', 'Carry things around town!', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
		('Glasses', 129.99, 'Travel', 'Now you can see!', 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
		('Cup', 4.99, 'Cup', 'Drink anything with it!', 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
		('Shirt', 29.99, 'Cloth', 'Wear it with style!', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80');
	EOSQL
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
	echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
	for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
		create_user_and_database $db
	done
	echo "Multiple databases created"
	create_schema_and_populate_data
fi

