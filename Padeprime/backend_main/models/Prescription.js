const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the age sub-schema
const ageSchema = new Schema({
    years: {
        type: Number,
        min: 0
    },
    months: {
        type: Number,
        min: 0,
        max: 11
    }
});

// Define the medications sub-schema
const medicationSchema = new Schema({
    type: {
        type: String
    },
    name: {
        type: String
    },
    dosage: String,
    amount: String,
    frequency: String,
    time_of_administration: String,
    duration: String,
    route: String,
    special_instructions: String,
    precautions: String
});

// Define the prescription schema
const PrescriptionSchema = new Schema({
    name: {
        type: String
    },
    age: ageSchema,
    sex: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    present_visit: {
        type: Date
    },
    last_visit: Date,
    visit_number: String,
    phone_number: {
        type: String
    },
    email_address: {
        type: String
    },
    medical_history: String,
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    bmi: Number,
    bp_systolic: Number,
    bp_diastolic: Number,
    heart_rate: Number,
    respiratory_rate: Number,
    oxygen_saturation: Number,
    blood_sugar: Number,
    chief_complain: String,
    other_findings: String,
    provisional_diagnosis: String,
    confirmation_tests: String,
    medications: [medicationSchema], // Updated to use the medication schema
    prescription_duration: String,
    refills: Number,
    final_diagnosis: String,
    signature: String
},
{ timestamps: true });

module.exports = mongoose.model('Prescription', PrescriptionSchema);
