import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "./routes/auth.js"; 
import schoolRoutes from "./routes/schools.js";
// import studentRoutes from "./routes/students.js";
// import attendanceRoutes from "./routes/attendance.js";
import db from './db/connection.js'

dotenv.config();   // load enviorenment variables from .env file
                   // to read them process.env.VARIABLE_NAME
const app = express();

// Routes
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);  // all routes in authRoutes will be prefixed with /api/auth
app.use("/api/schools", schoolRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/attendance", attendanceRoutes);


// every route in express looks like this -> app.METHOD(PATH, CALLBACK_FUNCTION);
// METHOD -> get, post, put, delete, etc
// PATH -> route path or endpoint
// CALLBACK_FUNCTION -> function that will be executed when the route is matched
// arrow function structure -> (parameters) => { statements }

// to check if the server is running
// comment this
app.get("/", (req, res) => {
    res.send("Backend server is running");
});

// JSON is used to send and receive data from the server (frontend to backend and vice versa)

// get all users from the database
// app.get("/users", (req, res) => {
//     db.query("SELECT * FROM users", (err, results) => {
//         if (err) return res.status(500).send("DB query error");
//         return res.json(results);
//     });
// });

// global error handler
app.use((req, res) => {
    res.status(404).json({message: "Route not found"});
});

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});