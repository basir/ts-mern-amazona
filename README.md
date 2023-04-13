# TypeSript MERN AMAZONA

Welcome to my TypeScript course to build a fully-functional e-commerce website exactly like amazon. Open your code editor and follow me for the next hours to build an e-commerce website using MERN stack (MongoDB, ExpressJS, React and Node.JS).

![amazona](/frontend/public/images/amazona.png)

## Get Course:

[https://youtu.be/-ifcPnXHn8Q](https://youtu.be/-ifcPnXHn8Q)

## Demo Website

- 👉 Render : [https://ts-amazona-final.onrender.com](https://ts-amazona-final.onrender.com)

## You Will Learn

- Creating react application by Vite in TypeScript
- Defining and exporting Types like product, orders and user in frontend
- Creating e-commerce pages like cart, checkout and place order using React Router Dom
- Using React hooks to handle form inputs and fetch backend api
- Managing and monitoring application state by React Context
- Handling shopping cart using reducers and local storage
- Building backend web api by node.js, express.js and MongoDB
- Handling authentication and authorization using JsonWebToken and express middleware.
- Deploying your application on cloud servers like Render
- PayPal and Stipe for online payment,
- Render for deployment
- Google Map for locate customer address on map
- Mailgun to email order receipt to user

## Run Locally

### 1. Clone repo

```
$ git clone git@github.com:basir/ts-mern-amazona.git
$ cd ts-mern-amazona
```

### 2. Create .env File

- duplicate .env.example in backend folder and rename it to .env

### 3. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - In .env file update MONGODB_URI=mongodb://localhost/amazona
- OR Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - In .env file update MONGODB_URI=mongodb+srv://your-db-connection

### 4. Run Backend

```
$ cd backend
$ npm install
$ npm start
```

### 5. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 6. Seed Users and Products

- Run this on browser: http://localhost:5000/api/seed
- It returns admin email and password and 6 sample products

### 7. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin

## Support

- Contact Instructor: [Basir](mailto:basir.jafarzadeh@gmail.com)

## Lessons

- [View All Lessons Scripts](/lessons/)
