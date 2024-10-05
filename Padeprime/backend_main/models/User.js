const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
  parentName: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true // Change if mobile must be unique
  },
  email: {
    type: String,
    required: true,
    unique: true // Change if email must be unique
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Patient Schema
const PatientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  fathersName: {
    type: String,
    required: true
  },
  mothersName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  slot: {
    type: String,
    required: true
  },
  appointmentNumber: {
    type: String,
    required: true
  },
  dateofappointment: {
    type: Date,
    required: true
  },
  serialNumber: {
    type: Number,
    required: true
  },
  doctorname: {
    type: String,
    required: true
  },
  clinicLocation: {
    type: String,
    required: true
  },
  image: {
    type: String, // URL or path to the image file
    required: false // Optional if you want to allow patients without an image initially
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Patient = mongoose.model('Patient', PatientSchema);

module.exports = { User, Patient };

