import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app2.css'; // Ensure your styles are in this file
import { NavLink } from "react-router-dom";


const medications = [
  { name: "Ciprofloxacin", dosage: "20-40", amount: 30, frequency: "BD" ,time_of_administration: "PC",route:"Oral" },
  { name: "Norfloxacin", dosage: "10-15", amount: 12.5, frequency: "BD",time_of_administration: "PC",route:"Oral" },
  { name: "Ofloxacin", dosage: "5-10", amount: 7.5, frequency: "BD",time_of_administration: "PC",route:"IV" },
  { name: "Amoxycillin", dosage: "25-50", amount: 37.5, frequency: "TDS",time_of_administration: "PC",route:"Oral" }
  // Add more medications as needed
];

function DoctorInterface() {
  const [formData, setFormData] = useState({
    name: '',
    age: { years: 0, months: 0 },
    sex: '',
    present_visit: '',
    last_visit: '',
    visit_number: '',
    phone_number: '',
    email_address: '',
    medical_history: '',
    height: '',
    weight: '',
    bmi: '',
    bp_systolic: '',
    bp_diastolic: '',
    heart_rate: '',
    respiratory_rate: '',
    oxygen_saturation: '',
    blood_sugar: '',
    chief_complain: '',
    other_findings: '',
    provisional_diagnosis: '',
    confirmation_tests: '',
    medications: [
      {
        type: '',
        name: '',
        dosage: '',
        amount: '',
        frequency: '',
        time_of_administration: '',
        duration: '',
        route: '',
        special_instructions: '',
        precautions: '',
      }
    ],
    prescription_duration: '',
    refills: 0,
    final_diagnosis: '',
    signature: ''
  });

  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // Load click count from localStorage on component mount
    const savedCount = parseInt(localStorage.getItem('clickCount')) || 0;
    setClickCount(savedCount);
  }, []);

  const incrementClickCount = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    localStorage.setItem('clickCount', newCount.toString());
  };

  const handleCheckIn = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/doctor-times/check-in', { doctorId: 'doctor-id-here' });
      alert(`Check-in time recorded: ${new Date(response.data.checkInTime).toLocaleTimeString()}`);
  
      // Reset click count to 1 in localStorage
      localStorage.setItem('clickCount', '1');
      setClickCount(1); // Update state to reflect the change if needed
    } catch (error) {
      console.error('Error recording check-in time:', error);
    }
  };
  

  const handleCheckOut = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/doctor-times/check-out', { doctorId: 'doctor-id-here' });
      alert(`Check-out time recorded: ${new Date(response.data.checkOutTime).toLocaleTimeString()}`);
    } catch (error) {
      console.error('Error recording check-out time:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('age-')) {
      const ageField = name.split('-')[1];
      setFormData({
        ...formData,
        age: { ...formData.age, [ageField]: value }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleMedicationChange = (index, e) => {
    const { name, value } = e.target;
    const newMedications = formData.medications.map((med, medIndex) => {
      if (index === medIndex) {
        return { ...med, [name]: value };
      }
      return med;
    });
    setFormData({ ...formData, medications: newMedications });
  };

  const handleMedicationChangeDict = (index, e) => {
    const { name, value } = e.target;
    const selectedMedication = medications.find(med => med.name === value);
    const newMedications = formData.medications.map((med, medIndex) => {
      if (index === medIndex) {
        return {
          ...med,
          name: selectedMedication ? selectedMedication.name : value,
          dosage: selectedMedication ? selectedMedication.dosage : '',
          amount: selectedMedication ? (selectedMedication.amount)*(formData.weight) : '',
          frequency: selectedMedication ? selectedMedication.frequency : '',
          time_of_administration: selectedMedication ? selectedMedication.time_of_administration: '',
          route: selectedMedication ? selectedMedication.route: ''

        };
      }
      return med;
    });
    setFormData({ ...formData, medications: newMedications });
  };

  
  const handleMedChange = (index,field, e) => {
    const { name, value } = e.target;
    const selectedMedication = medications.find(med => med.name === value);
    const newMedications = formData.medications.map((med, medIndex) => {
      if (index === medIndex && field=="Dosage") {
        return {
          ...med,
          // name: selectedMedication ? selectedMedication.name : value,
          dosage: selectedMedication ? selectedMedication.dosage : value
          // amount: selectedMedication ? selectedMedication.amount : '',
          // frequency: selectedMedication ? selectedMedication.frequency : ''
        };
      }
      if (index === medIndex && field=="Amount") {
        return {
          ...med,
          // name: selectedMedication ? selectedMedication.name : value,
          // dosage: selectedMedication ? selectedMedication.dosage : value,
          amount: selectedMedication ? (selectedMedication.amount)*(formData.weight) : value
          // frequency: selectedMedication ? selectedMedication.frequency : ''
        };
      }
      if (index === medIndex && field=="Frequency") {
        return {
          ...med,
          // name: selectedMedication ? selectedMedication.name : value,
          // dosage: selectedMedication ? selectedMedication.dosage : value,
          // amount: selectedMedication ? selectedMedication.amount : value,
          frequency: selectedMedication ? selectedMedication.frequency : value
        };
      }
      if (index === medIndex && field=="TimeOfAdministration") {
        return {
          ...med,
          // name: selectedMedication ? selectedMedication.name : value,
          // dosage: selectedMedication ? selectedMedication.dosage : value,
          // amount: selectedMedication ? selectedMedication.amount : value,
          // frequency: selectedMedication ? selectedMedication.frequency : value
          time_of_administration: selectedMedication ? selectedMedication.time_of_administration: value
          // route: selectedMedication ? selectedMedication.route: ''
        };
      }
      if (index === medIndex && field=="Route") {
        return {
          ...med,
          // name: selectedMedication ? selectedMedication.name : value,
          // dosage: selectedMedication ? selectedMedication.dosage : value,
          // amount: selectedMedication ? selectedMedication.amount : value,
          // frequency: selectedMedication ? selectedMedication.frequency : value
          // time_of_administration: selectedMedication ? selectedMedication.time_of_administration: '',
          route: selectedMedication ? selectedMedication.route: value
        };
      }
      return med;
    });
    setFormData({ ...formData, medications: newMedications });
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        {
          type: '',
          name: '',
          dosage: '',
          amount: '',
          frequency: '',
          time_of_administration: '',
          duration: '',
          route: '',
          special_instructions: '',
          precautions: '',
        }
      ]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/prescription', formData);
      console.log('Prescription saved successfully:', response.data);
      window.alert('Your data has been submitted successfully!');
      incrementClickCount(); // Increment count on successful submission
    } catch (error) {
      console.error('Error saving prescription:', error);
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  return (
    <div className="container">
      <div className='left-section'>
      <div className="header">
        <h1 className='hd'>DOCTOR'S INTERFACE</h1>
      </div>
      <div className="check-in-out">
          <button onClick={handleCheckIn} className="text-white bg-green-800 hover:bg-green-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 focus:outline-none">Check In</button>
          <button onClick={handleCheckOut} className="text-white bg-orange-700 hover:bg-red-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 focus:outline-none">Check Out</button>
          <NavLink to = "/patient-list"><button  className="text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 focus:outline-none">Patient List</button></NavLink>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="prescription-container">
          <div className="left-side-prescription">
            <h2>Patient's Personal Information :</h2>
            <div className="form-container">
              <div className="form-row">
                <div className="form-group2">
                  <label htmlFor="name">Patient's Name :</label>
                  <input type="text" id="name" name="name" onChange={handleInputChange} />
                </div>
                <div className="form-group2">
                  <label htmlFor="sex">Patient's Gender :</label>
                  <input type="text" id="sex" name="sex" onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group2">
                  <label htmlFor="age-years">Patient's Age :</label>
                  <input type="number" id="age-years" name="age-years" onChange={handleInputChange} />
                  <input type="number" id="age-months" name="age-months" onChange={handleInputChange} />
                </div>
                <div className="form-group2">
                  <label htmlFor="present_visit">Date of Current Visit :</label>
                  <input type="date" id="present_visit" name="present_visit" onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group2">
                  <label htmlFor="phone_number">Ph. No. :</label>
                  <input type="text" id="phone_number" name="phone_number" onChange={handleInputChange} />
                </div>
                <div className="form-group2">
                  <label htmlFor="last_visit">Date of First Visit :</label>
                  <input type="date" id="last_visit" name="last_visit" onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group2">
                  <label htmlFor="email_address">Email :</label>
                  <input type="email" id="email_address" name="email_address" onChange={handleInputChange} />
                </div>
                <div className="form-group2">
                  <label htmlFor="visit_number">Number of Follow Ups :</label>
                  <input type="text" id="visit_number" name="visit_number" onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group2">
                  <label htmlFor="appointment_id">Appointment ID :</label>
                  <input type="text" id="appointment_id" name="appointment_id" onChange={handleInputChange} />
                </div>
              </div>
            </div>
            <h2>Patient's Basic General Examination Information:</h2>
            <div className="form-container">
              <div className="form-group">
                <div className="form-group2">
                  <label htmlFor="height">Height(cm):</label>
                  <input type="number" id="height" name="height" onChange={handleInputChange} />
                </div>
                <div className="form-group2">
                  <label htmlFor="weight">Weight(kg):</label>
                  <input type="number" id="weight" name="weight" onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="form-group2">
                  <label htmlFor="bmi">BMI:</label>
                  <input type="number" id="bmi" name="bmi" value={formData.bmi} readOnly />
                </div>
                <div className="form-group2">
                  <label htmlFor="heart_rate">Heart Rate:</label>
                  <input type="number" id="heart_rate" name="heart_rate" onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="form-group2">
                  <label htmlFor="respiratory_rate">Respiratory Rate:</label>
                  <input type="number" id="respiratory_rate" name="respiratory_rate" onChange={handleInputChange} />
                </div>
                <div className="form-group2">
                  <label htmlFor="oxygen_saturation">Oxygen Saturation:</label>
                  <input type="number" id="oxygen_saturation" name="oxygen_saturation" onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="form-group2">
                  <label htmlFor="blood_sugar">Capillary Blood Sugar (using glucometer):</label>
                  <input type="number" id="blood_sugar" name="blood_sugar" onChange={handleInputChange} />
                </div>
                <div className="form-group2">
                  <label htmlFor="bp_systolic">Systolic:</label>
                  <input type="number" id="bp_systolic" name="bp_systolic" onChange={handleInputChange} />
                </div>
                
              </div>
              <div className="form-group">
              <div className="form-group2">
                  <label htmlFor="bp_diastolic">Diastolic:</label>
                  <input type="number" id="bp_diastolic" name="bp_diastolic" onChange={handleInputChange} />
                </div>
                </div>
            </div>
            <h2>Complain of (C/O): </h2>
            <div className="form-container">
              <div className="form-group2">
                <label htmlFor="chief_complain">Chief Complain:</label>
                <textarea id="chief_complain" name="chief_complain" rows="3" onChange={handleInputChange}></textarea>
              </div>
            </div>
            <h2>Any relevant other findings: </h2>
            <div className="form-container">
              <div className="form-group2">
                <label htmlFor="other_findings">Other Findings:</label>
                <textarea id="other_findings" name="other_findings" rows="3" onChange={handleInputChange}></textarea>
              </div>
            </div>

            <h2>Provisional Diagnosis (P/D):</h2>
            <div className="form-container">
              <div className="form-group2">
                <label htmlFor="provisional_diagnosis">Provisional Diagnosis:</label>
                <textarea id="provisional_diagnosis" name="provisional_diagnosis" rows="3" onChange={handleInputChange}></textarea>
              </div>
            </div>
            <h2>Tests for Confirmation:</h2>
            <div className="form-container">
              <div className="form-group2">
                <label htmlFor="confirmation_tests">Tests:</label>
                <textarea id="confirmation_tests" name="confirmation_tests" rows="3" onChange={handleInputChange}></textarea>
              </div>
            </div>
            <h2>Sigificant Medical History:</h2>
            <div className="form-container">
              <div className="form-group2">
                <label htmlFor="medical_history">Medical History:</label>
                <textarea id="medical_history" name="medical_history" rows="3" onChange={handleInputChange}></textarea>
              </div>
            </div>
            <h2>Medications:</h2>
            {formData.medications.map((med, index) => (
              <div key={index} className="form-container">
                <div className="form-group">
                  <div className="form-group2">
                    <label htmlFor={`med-type-${index}`}>Type:</label>
                    <input type="text" id={`med-type-${index}`} name="type" onChange={(e) => handleMedicationChange(index, e)} />
                  </div>
                  <div className="form-group2">
                    <label htmlFor={`medication-name-${index}`}>Name:</label>
                    <input 
                      list="medications-list"
                      type="text"
                      id={`medication-name-${index}`}
                      name={`medication-name-${index}`}
                      value={med.name}
                      onChange={(e) => handleMedicationChangeDict(index, e)}
                    />
                    <datalist id="medications-list">
                      {medications.map((medication) => (
                        <option key={medication.name} value={medication.name} />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="form-group">
                <div className="form-group2">
                    <label htmlFor={`medication-dosage-${index}`}>Dosage(mg/kg/day):</label>
                    <input
                      type="text"
                      id={`medication-dosage-${index}`}
                      name={`medication-dosage-${index}`}
                      value={med.dosage}
                      onChange={(e) => handleMedChange(index,"Dosage", e)}
                    />
                  </div>
                  <div className="form-group2">
                    <label htmlFor={`medication-amount-${index}`}>Amount(mg/day):</label>
                    <input
                      type="text"
                      id={`medication-amount-${index}`}
                      name={`medication-amount-${index}`}
                      value={med.amount}
                      onChange={(e) => handleMedChange(index,"Amount", e)}
                    />
                  </div>
                </div>
                <div className="form-group">
                <div className="form-group2">
                    <label htmlFor={`medication-frequency-${index}`}>Frequency:</label>
                    <input
                      type="text"
                      id={`medication-frequency-${index}`}
                      name={`medication-frequency-${index}`}
                      value={med.frequency}
                      onChange={(e) => handleMedChange(index,"Frequency", e)}
                    />
                  </div>
                  <div className="form-group2">
                    <label htmlFor={`medication-time-${index}`}>Time of Administration:</label>
                    <input
                      type="text"
                      id={`medication-time-${index}`}
                      name={`medication-time-${index}`}
                      value={med.time_of_administration}
                      onChange={(e) => handleMedChange(index,"TimeOfAdministration", e)}
                    />
                  </div>
                </div>
                <div className="form-group">
                <div className="form-group2">
                    <label htmlFor={`medication-duration-${index}`}>Duration:</label>
                    <input
                      type="text"
                      id={`medication-duration-${index}`}
                      name={`medication-duration-${index}`}
                       value={med.duration}
                      onChange={(e) => handleMedicationChange(index, e)}
                    />
                  </div>
                  <div className="form-group2">
                    <label htmlFor={`medication-route-${index}`}>Route:</label>
                    <input
                      type="text"
                      id={`medication-route-${index}`}
                      name={`medication-route-${index}`}
                      value={med.route}
                      onChange={(e) => handleMedChange(index,"Route" ,e)}
                    />
                  </div>
                </div>
                <div className="form-group">
                <div className="form-group2">
                    <label htmlFor={`medication-special-${index}`}>Special Instructions:</label>
                    <input
                      type="text"
                      id={`medication-special-${index}`}
                      name={`medication-special-${index}`}
                     value={med.special_instructions}
                      onChange={(e) => handleMedicationChange(index, e)}
                    />
                  </div>
                  <div className="form-group2">
                    <label htmlFor={`medication-precautions-${index}`}>Precautions:</label>
                    <input
                      type="text"
                      id={`medication-precautions-${index}`}
                      name={`medication-precautions-${index}`}
                      value={med.precautions}
                      onChange={(e) => handleMedicationChange(index, e)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={addMedicine} className='add-medicine'> <i className='bx bx-plus-circle'></i> Add Medicine</button>
            <h2>Duration of prescription:</h2>
            <div className="form-container ">
              <div className="form-group2">
                <label htmlFor="prescription_duration">Duration:</label>
                <input type="text" id="prescription_duration" name="prescription_duration" onChange={handleInputChange} />
              </div>
            </div>
            <h2>Refill Information:</h2>
            <div className="form-container">
              <div className="form-group2">
                <label htmlFor="refills">Number of Refills:</label>
                <input type="number" id="refills" name="refills" onChange={handleInputChange} />
              </div>
            </div>
            <h2>Final Diagnosis:</h2>
            <div className="form-container">
              <div className="form-group2">
                <label htmlFor="final_diagnosis">Final Diagnosis:</label>
                <input type="text" id="final_diagnosis" name="final_diagnosis" rows="3" onChange={handleInputChange} />
              </div>
            </div>
            <h2>Signature:</h2>
            <div className="form-container">
              <div className="form-group2">
                <label htmlFor="signature">Signature:</label>
                <input type="text" id="signature" name="signature" onChange={handleInputChange} />
              </div>
            </div>
        

          </div>
        </div>
        
        <button type="submit" className="save-prescription-button">Save Prescription</button>
        
      </form>
     </div>
         
    </div>
  );
}

export default DoctorInterface;
