// const express = require('express');
// const router = express.Router();
// const { Patient } = require('../models/User');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const multer = require('multer');
// // Function to generate a serial number based on the doctor, date, and slot
// const generateSerialNumber = async (doctorname, dateofappointment, slot) => {
//   try {
//     const count = await Patient.countDocuments({ doctorname, dateofappointment, slot });
//     return count + 1; // Serial number starts from 0
//   } catch (error) {
//     throw new Error('Error generating serial number');
//   }
// };

// // Function to check if the current time falls within the given slot time range
// const isTimeWithinSlot = (currentTimestamp, slot) => {
//   const [start, end] = slot.split('-');

//   // Function to convert slot time (e.g., "7pm") into a 24-hour format
//   const parseTime = (time) => {
//     const [hourString, meridian] = time.match(/(\d+)(am|pm)/i).slice(1);
//     let hour = parseInt(hourString);
//     if (meridian.toLowerCase() === 'pm' && hour !== 12) {
//       hour += 12;
//     } else if (meridian.toLowerCase() === 'am' && hour === 12) {
//       hour = 0; // Handle midnight case
//     }
//     return hour;
//   };

//   const startHour = parseTime(start);
//   const endHour = parseTime(end);

//   // Create Date objects for the start and end times
//   const startTime = new Date();
//   startTime.setHours(startHour, 0, 0, 0);

//   const endTime = new Date();
//   endTime.setHours(endHour, 0, 0, 0);

//   // Compare if the current time falls within the start and end times
//   return currentTimestamp >= startTime.getTime() && currentTimestamp <= endTime.getTime();
// };

// // Function to check if the appointment date matches the current date
// const isDateMatched = (appointmentDate) => {
//   const today = new Date();
//   const appointment = new Date(appointmentDate);
  
//   return today.toDateString() === appointment.toDateString(); // Compares if both dates are the same
// };

// // Function to generate a unique appointment number
// const generateAppointmentNumber = () => {
//   const now = Date.now().toString(); // Use timestamp to generate unique number
//   return `APT-${now}`;
// };
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Directory to store the uploaded files
//   },
//   filename: (req, file, cb) => {
//     // Use original name and current timestamp to avoid conflicts
//     const uniqueSuffix = Date.now() + path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   }
// });

// // Initialize multer with storage settings
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
//   fileFilter: (req, file, cb) => {
//     // Accept only jpg and png files
//     const filetypes = /jpeg|jpg|png/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Error: File type not supported!'));
//   }
// });
// // Endpoint to create a new patient appointment
// // router.post('/patients', async (req, res) => {
// //   try {
// //     console.log('Request body:', req.body); // Log the incoming request data

// //     const { doctorname, clinicLocation, dateofappointment, slot } = req.body; // Extract clinicLocation from request body
// //     if (!doctorname || !clinicLocation || !dateofappointment || !slot) {
// //       throw new Error('Missing required fields');
// //     }

// //     const serialNumber = await generateSerialNumber(doctorname, dateofappointment, slot); // Pass doctorname and dateofappointment
// //     const appointmentNumber = generateAppointmentNumber();

// //     const patientData = {
// //       ...req.body,
// //       serialNumber: serialNumber, // Serial number starts from zero for the given doctor, date, and slot
// //       appointmentNumber: appointmentNumber,
// //       doctorname: doctorname, // Ensure doctorname is stored
// //       clinicLocation: clinicLocation // Ensure clinicLocation is stored
// //     };

// //     const patient = await Patient.create(patientData);
// //     res.json(patient);
// //   } catch (error) {
// //     console.error('Error creating patient appointment:', error); // Log error details on the server
// //     res.status(400).json({ error: error.message });
// //   }
// // });
// router.post('/patients', upload.single('image'), async (req, res) => {
//   try {
//     console.log('Request body:', req.body); // Log the incoming request data

//     const { doctorname, clinicLocation, dateofappointment, slot } = req.body;
//     if (!doctorname || !clinicLocation || !dateofappointment || !slot) {
//       throw new Error('Missing required fields');
//     }

//     const serialNumber = await generateSerialNumber(doctorname, dateofappointment, slot); // Generate serial number
//     const appointmentNumber = generateAppointmentNumber();

//     const patientData = {
//       ...req.body,
//       serialNumber: serialNumber,
//       appointmentNumber: appointmentNumber,
//       doctorname: doctorname,
//       clinicLocation: clinicLocation,
//       image: req.file ? req.file.path : null // Store the image path
//     };

//     const patient = await Patient.create(patientData);
//     res.status(201).json(patient); // Respond with created patient data
//   } catch (error) {
//     console.error('Error creating patient appointment:', error); // Log error details on the server
//     res.status(400).json({ error: error.message });
//   }
// });

// // Endpoint to get the latest patient appointment
// router.get('/patients/latest', async (req, res) => {
//   try {
//     const latestPatient = await Patient.findOne().sort({ createdAt: -1 });
//     res.json(latestPatient);
//   } catch (error) {
//     console.error('Error fetching latest patient appointment:', error);
//     res.status(500).json({ error: 'Error fetching latest patient appointment' });
//   }
// });

// // Endpoint to fetch patients based on doctor name, slot, and appointment date
// router.get('/patients/doctor/:doctorname/slot/:timestamp', async (req, res) => {
//   const { doctorname, timestamp } = req.params;
//   const currentTimestamp = parseInt(timestamp);

//   try {
//     // Find patients for the specified doctor
//     const patients = await Patient.find({ doctorname: doctorname });

//     // Filter patients by both slot and date
//     const filteredPatients = patients.filter(patient => 
//       isDateMatched(patient.dateofappointment) && isTimeWithinSlot(currentTimestamp, patient.slot)
//     );

//     if (filteredPatients.length === 0) {
//       return res.status(404).json({ message: 'No patients found for the current time slot and appointment date' });
//     }

//     res.json(filteredPatients);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Payment Endpoint with Stripe
// router.post('/payment', async (req, res) => {
//   try {
//     const product = await stripe.products.create({
//       name: "Appointment Booking",
//     });

//     const price = await stripe.prices.create({
//       product: product.id,
//       unit_amount: 100 * 90, // 100 INR
//       currency: 'inr',
//     });

//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price: price.id,
//           quantity: 1,
//         }
//       ],
//       mode: 'payment',
//       success_url: 'http://localhost:5173/success',
//       cancel_url: 'http://localhost:5173/cancel',
//       customer_email: 'demo@gmail.com', // You may want to pass the customer email from request body
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error('Error creating payment session:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const { Patient } = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Function to generate a serial number based on the doctor, date, and slot
const generateSerialNumber = async (doctorname, dateofappointment, slot) => {
  try {
    const count = await Patient.countDocuments({ doctorname, dateofappointment, slot });
    return count + 1; // Serial number starts from 1
  } catch (error) {
    throw new Error('Error generating serial number');
  }
};

// Function to check if the current time falls within the given slot time range
const isTimeWithinSlot = (currentTimestamp, slot) => {
  const [start, end] = slot.split('-');
  const parseTime = (time) => {
    const [hourString, meridian] = time.match(/(\d+)(am|pm)/i).slice(1);
    let hour = parseInt(hourString);
    if (meridian.toLowerCase() === 'pm' && hour !== 12) {
      hour += 12;
    } else if (meridian.toLowerCase() === 'am' && hour === 12) {
      hour = 0; // Handle midnight case
    }
    return hour;
  };

  const startHour = parseTime(start);
  const endHour = parseTime(end);
  
  const startTime = new Date();
  startTime.setHours(startHour, 0, 0, 0);
  
  const endTime = new Date();
  endTime.setHours(endHour, 0, 0, 0);
  
  return currentTimestamp >= startTime.getTime() && currentTimestamp <= endTime.getTime();
};

// Function to check if the appointment date matches the current date
const isDateMatched = (appointmentDate) => {
  const today = new Date();
  const appointment = new Date(appointmentDate);
  return today.toDateString() === appointment.toDateString(); // Compares if both dates are the same
};

// Function to generate a unique appointment number
const generateAppointmentNumber = () => {
  const now = Date.now().toString(); // Use timestamp to generate unique number
  return `APT-${now}`;
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Directory to store the uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

// Initialize multer with storage settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File type not supported!'));
  }
});

// Endpoint to create a new patient appointment
router.post('/patients', upload.single('image'), async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the incoming request data

    const { doctorname, clinicLocation, dateofappointment, slot } = req.body;
    if (!doctorname || !clinicLocation || !dateofappointment || !slot) {
      throw new Error('Missing required fields');
    }

    const serialNumber = await generateSerialNumber(doctorname, dateofappointment, slot); // Generate serial number
    const appointmentNumber = generateAppointmentNumber();

    const patientData = {
      ...req.body,
      serialNumber,
      appointmentNumber,
      doctorname,
      clinicLocation,
      image: req.file ? req.file.path : null // Store the image path
    };

    const patient = await Patient.create(patientData);
    res.status(201).json(patient); // Respond with created patient data
  } catch (error) {
    console.error('Error creating patient appointment:', error);
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to get the latest patient appointment
router.get('/patients/latest', async (req, res) => {
  try {
    const latestPatient = await Patient.findOne().sort({ createdAt: -1 });
    res.json(latestPatient);
  } catch (error) {
    console.error('Error fetching latest patient appointment:', error);
    res.status(500).json({ error: 'Error fetching latest patient appointment' });
  }
});

// Endpoint to fetch patients based on doctor name, slot, and appointment date
router.get('/patients/doctor/:doctorname/slot/:timestamp', async (req, res) => {
  const { doctorname, timestamp } = req.params;
  const currentTimestamp = parseInt(timestamp);

  try {
    // Find patients for the specified doctor
    const patients = await Patient.find({ doctorname });

    // Filter patients by both slot and date
    const filteredPatients = patients.filter(patient => 
      isDateMatched(patient.dateofappointment) && isTimeWithinSlot(currentTimestamp, patient.slot)
    );

    if (filteredPatients.length === 0) {
      return res.status(404).json({ message: 'No patients found for the current time slot and appointment date' });
    }

    res.json(filteredPatients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Payment Endpoint with Stripe
router.post('/payment', async (req, res) => {
  try {
    const product = await stripe.products.create({
      name: "Appointment Booking",
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 100 * 90, // 100 INR
      currency: 'inr',
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
      customer_email: 'demo@gmail.com', // Pass the customer email from request body if available
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating payment session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
