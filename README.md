https://marketing-app-nvpy.onrender.com
# Multi-Level Marketing API

This is a Multi-Level Marketing (MLM) API developed using Node.js and MongoDB. It allows users to create a multi-level network and distribute earnings among different levels of users based on specified rules.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/amolthakare/marketing-app.git
```


## Create a .env file in the root directory and add the following environment variables:

```bash
mongoURL=`your mongodb url`
port = `port`
key =`your key`
```


## Install dependencies and start server

```bash
cd marketing-app
npm install
node index.js
```

## API Endpoints

### Schema
| parameter | type | description |
| :---- | :---- | :---- |
| `name` | `String` | Required: user name |
| `parentId` | `ObjectId` | required: ref of `User` |
| `level` | `Number` | Required: level will be set as parentLevel+1 and if no parent then 0 |
| `earnings` | `Number` | Earning of the user |


### Create a new user
- URL: https://marketing-app-nvpy.onrender.com/users
- Method: POST
- Request Body:
```bash
{
  "name": "<User_Name>",
  "parentId": "<parent_user_id>"
}

```
- name (required): Name of the user.
- parentId (optional): ID of the parent user.


### Distribute earnings
- URL: https://marketing-app-nvpy.onrender.com/distribute
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
- URL: https://marketing-app-nvpy.onrender.com/users
- Method: GET

### Testing
- You can use tools like Postman or cURL to test the API endpoints.

