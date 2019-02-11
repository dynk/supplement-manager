# supplements
manage supplements stock


# Prerequisites
Docker version >= 17.06
docker-compose version >= 1.21.1
run the file build.sh

# Guide through the application
To create a regular user use the route:

    - POST localhost:3032/v1/users
    - Payload: 
    {
	    "email": "email@email.com",
	    "name": "user name",
	    "password": "yoursecretpassword",
      
    }

then you will receive a token to insert in your header in the (x-auth), use it to access your data.

To create a user admin provide the adminCode field with 'secretadmincode123' code.

To get users data:

    - GET localhost:3032/v1/users
    - Response: 
    [{
	    "email": "email@email.com",
	    "name": "user name"
    }]

To login:

    - POST localhost:3032/v1/users/login
    - Payload: 
    {
	    "email": string,
	    "password": string,
    }

then you will receive a token to insert in your header in the (x-auth), use it to access your data.

To get all available credentials:

    - GET localhost:3032/v1/users/credentials
    - Response: 
    [{
	    "email": "email@email.com",
	    "name": "user name"
    }]

To update a user and your credential you need to use a admin user,insert authentication token on the header in parameters x-auth and then:

    - PUT localhost:3032/v1/users
    - Payload: 
    {
	    "accessLevel": "access level",
      "name": "name"
    }

To create new vendor  you need to use a admin user,insert authentication token on the header in parameters x-auth and then:

    - POST localhost:3032/v1/vendor
    - Payload: 
    {
	    "name": "vendor name"
    }

To get all vendors:

    - GET localhost:3032/v1/vendor
    - Response: 
    {
      "_id": "5c61a3631e8eab0013e17a90",
	    "name": "vendor name"
    }

To create new supplement you need to use a admin user,insert authentication token on the header in parameters x-auth and then:

    - POST localhost:3032/v1/supplements
    - Payload: 
    {
	    "name": "supplements 1",
	    "manufacturer": "manufacturer 1",
	    "stockKepingUnit": "L",
	    "vendorId": "5c61650827acb6083202e479",
	    "stock": 40,
	    "lowStockWaterMark": 30,
	    "size": 3
    }

To get all supplements with specific filter:

    - GET localhost:3032/v1/supplements?isCriticalStock=true&vendorName=name&name=name&stock=stock
    - Response: 
    {
      "_id": "5c61a3631e8eab0013e17a90",
	    "name": "vendor name"
    }