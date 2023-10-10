# Express API

This repository contains a basic Express API setup with user authentication and CRUD operations. The project is
structured using a controller-service-model pattern and includes utilities for handling authentication and logging.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

- Node.js
- MongoDB

### Installing

1. Clone the repository:

```bash
git clone https://github.com/sano0007/node-express-api.git
cd node-express-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory of your project, and add your MongoDB connection string and other
   configurations:

```env
MONGODB_URI=mongodb://localhost:27017/your-database
...
```

4. Start the development server:

```bash
npm start
```

## Usage

### User Authentication

- **Register**: Send a POST request with `email`, `username`, and `password` to `/auth/register`.
- **Login**: Send a POST request with `email` and `password` to `/auth/login`.

### User Management

- **Get All Users**: Send a GET request to `/users`.
- **Update User**: Send a POST request with user data to `/users/update/:id`.
- **Delete User**: Send a DELETE request to `/users/:id`.

## Running the Tests

Currently, there are no tests specified in the project. You can add your tests and update the `test` script in
the `package.json` file.

```json
"scripts": {
"test": "your-test-script"
}
```
