# Demo-Project-For-RDCD-BackEnd

## Description:

The main Pupose of this git ripo is to clearify of our understanding about node.js & postgresql by createing a Demo Crud Project. Here we will create 5 api which is provided to the frontend team by 31/08/2021.

## Collaborators:

1. Mohammad Arif Ullah
2. Tarik Hossain
3. Mosharof Hossan Mithu
4. Fahamida Shahrin
5. Khandakar Anim Hassan Adnan
6. Rukaiya Laboni
7. Md.Nazmul Haque

## Supervisor :

Ovi Chowdhury

## Tasks:

| No  | Name of the Apis              | Name of the Developer       | Method | Example                  |
| --- | ----------------------------- | --------------------------- | ------ | ------------------------ |
| 01  | Create Users with Image       | Khandakar Anim Hassan Adnan | post   | 127.0.0.1:8080\users     |
| 02  | Get the Users with Image      | Rukaiya Laboni              | get    | 127.0.0.1:8080\users\:id |
| 03  | Get the Users with pagination | Md.Nazmul Haque             | get    | 127.0.0.1:8080\users     |
| 04  | Update the User with Image    | Mohammad Arif Ullah         | put    | 127.0.0.1:8080\users\:id |
| 05  | Delet the User with Id        | Md.Nazmul Haque             | delet  | 127.0.0.1:8080\users\:id |

## Schema :

For create the users and images table i create a role name ' demo_crud_dev' and then alter the users and then create a database is called 'demo_crud'. I do this with both CLI sql and windows cmd

1.  In sql shell

- create role demo_crud_dev with login password 'demo111';
- alter role demo_crud_dev createdatabase;
- \du
- \q

2. windows cmd

   - psql -d postgres -U demo_crud_dev; (use the password demo111)
   - create database demo_crud;
   - \c demo_crud;
   - CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(20) NOT NULL,
     mobile VARCHAR(20),
     name TEXT,
     gender VARCHAR(6),
     role VARCHAR(5),
     password TEXT NOT NULL,
     UNIQUE(username,mobile)
     );
   - CREATE TABLE user_image (
     image_id BIGINT PRIMARY KEY NOT NULL UNIQUE,
     image TEXT,
     mimetype varchar(10),
     FOREIGN KEY (image_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
     );

   - please set the config.json and db.js according to this schema.

   - GRANT ROLE

   - GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO demo_crud_dev;

   - GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO demo_crud_dev;

=========================================================================================================================================

### New User Create API Documentation

      1.  {
          "username": "anim19998",
          "mobile": "+8801552324315",
          "name": "Kh Anim Hassan",
          "gender": "Male",
          "role": "Admin",
          "password": "ASD@asd$123",
          "image": "", //base64 value of uploaded image
          "mimetype": "" //mime type of uploaded image
          }

    - Front end team will give this type of json for creating a new user.
    - The base64 value of uploaded image and the mime type of uploaded image will be given by the front end team.
    - That means front end team receives the uploaded image then they will convert it to base64 after that will pass only the base64
      value and mime type to the json.

==========================================================================================================================================

2.  - In API there are some validations.If there is any type of empty field/invalid format, validator will give the message like-

               {
               "errors":[
               {
               "message":"Username field is empty",
               "field":"username"
               },
               {
               "message":"Username length must be between 3 to 20 character ",
               "field":"username"
               },
               {
               "message":"Invalid Mobile No. Please follow the internatinal format.",
               "field":"mobile"
               },
               {
               "message":"Role field is empty",
               "field":"role"
               },
               {
               "message":"Minimum password length is 8",
               "field":"password"
               },
               {
               "message":"Invalid password, it must contain Capital Letter, Small Letter, Number and Special Character",
               "field":"password"
               }
               ]}

========================================================================================================================================

3.  - If user give a repeated username/mobile number during user create, a error message will be shown like-

               {
               "message": "Usename is not unique. It already exists" //for repeat same username
               }

               {
               "message": "Mobile number is not unique. It already exists" //for repeat same mobile number
               }

========================================================================================================================================

4.  - When user will give all valid data then the all data will be inserted into the database and give a response with a JSON cotaining new user ID and a message like that-

               {
               "id": 7, //New user ID
               "message": "User Created"
               }

## Get User Data With Image
#### api: 127.0.0.1:8080/user/:id(4)
    {
       "message": "Request Successful",
       "usersdata": [
              {
                "username": "anim19998",
                "mobile": "+8801552324315",
                "name": "Kh Anim Hassan",
                "gender": "Male",
               "role": "Admin"
              }
          ],
          
          "image": [
                     {
                        "image":" "(base64)
                     }
                   ]
    
    }
        
## Get User Data With Pagination
#### api: 127.0.0.1:8080/user?page=1&limit=2

Json format: 

          {
                "message": "run suncessfully",
                "total_page": 1,
                "current_page": 1,
                "limit": 2,
                "next_page": {
                     "next": 0,
                     "message": "You in the Last Page"
                     },
                "previous_page": {
                     "previous": 0,
                     "message": "You are in the first page"
                       },
            "data": [
                 {
                
                      "id": 4
                      "username": "anim19998",
                      "mobile": "+8801552324315",
                      "name": "Kh Anim Hassan",
                      "gender": "Male",
                      "role": "Admin"
                },
              {
                      "id": 5,
                      "username": "sazzad19998",
                      "mobile": "+8801552324317",
                      "name": "Kh Anim Hassan",
                      "gender": "Male",
                      "role": "Admin"
              }
           ]
       }
  
  
 
         

