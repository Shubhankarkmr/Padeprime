const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoDB = require('./db');

dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend URL
}));
app.use(express.json());
app.use(bodyParser.json());

// Routes
const { router: createUserRouter, loggedInPatientName } = require('./Controller/CreateUser');
const displayDataRouter = require('./Controller/DisplayData');
const prescriptionRouter = require('./Controller/Prescription');
const bookAppointmentRouter = require('./Controller/Bookappointment');
const doctorLoginRouter = require('./Controller/Doctorlogin');
const doctorTimesRouter = require('./Controller/doctorTimes');
const locationRouter = require('./Controller/location');

app.use('/api', createUserRouter);
app.use('/api', displayDataRouter);
app.use('/api/prescription', prescriptionRouter);
app.use('/api', bookAppointmentRouter);
app.use('/api', doctorLoginRouter);
app.use('/api/doctor-times', doctorTimesRouter);
app.use('/api', locationRouter);

// Simple GET route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Initialize database connection and start server
mongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to the database. Server not started.", err);
});
