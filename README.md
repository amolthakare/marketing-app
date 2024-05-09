# Multi-Level Marketing API

This is a Multi-Level Marketing (MLM) API developed using Node.js and MongoDB. It allows users to create a multi-level network and distribute earnings among different levels of users based on specified rules.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/amolthakare/marketing-app.git
```


## Create a .env file in the root directory and add the following environment variables:

```bash
mongoURL=mongodb+srv://amol:amol@cluster0.5ygk2.mongodb.net/evalc4u5?retryWrites=true&w=majority
port = 4500
key = evalc4u5
```


## Install dependencies and start server

```bash
cd marketing-app
npm install
node index.js
```

## API Endpoints

### Create a new user
- URL: /users
- Method: POST
- Request Body:
```bash
{
  "name": "User Name",
  "parentId": "<parent_user_id>"
}

```
- name (required): Name of the user.
- parentId (optional): ID of the parent user.


### Distribute earnings
- URL: /distribute
- Method: POST
- Request Body:
```bash
{
  "userId": "<user_id>",
  "amount": 1000
}
```
- userId (required): ID of the user.
- amount (required): Amount to be distributed.

### Get all users
- URL: /users
- Method: GET

### Testing
- You can use tools like Postman or cURL to test the API endpoints.

