import { useState } from "react";
import axios from "axios";
import './PatientList.css';

const PatientList = () => {
  const [doctorName, setDoctorName] = useState('');
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  // Handle doctor name input change
  const handleDoctorNameChange = (e) => {
    setDoctorName(e.target.value);
  };

  // Function to fetch patients based on doctor and timestamp
  const fetchPatients = async (doctorName, timestamp) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/patients/doctor/${doctorName}/slot/${timestamp}`
      );
      const filteredPatients = response.data;
      setPatients(filteredPatients);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error fetching data");
      setPatients([]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTimestamp = Date.now();
    fetchPatients(doctorName, currentTimestamp);
  };

  // Handle fetching patients based on the current time slot
  const handleCurrentTimeClick = () => {
    const currentTimestamp = Date.now();
    fetchPatients(doctorName, currentTimestamp);
  };

  // Sort patients by serial number in ascending order
  const sortedPatients = [...patients].sort((a, b) => a.serialNumber - b.serialNumber);

  return (
    <div className="patient-list-container">
      <h2>Track Your Appointment Time</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <label>
          Doctor Name:
          <input
            type="text"
            value={doctorName}
            onChange={handleDoctorNameChange}
            required
          />
        </label>
        <button type="submit">Search by Current Timestamp</button>
      </form>

      <button onClick={handleCurrentTimeClick} className="current-time-button">
        Fetch Patients by Current Time
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {sortedPatients.length > 0 && (
        <ul className="patient-list">
          {sortedPatients.map((patient) => (
            <li key={patient._id}>
              <span className="serial-number">Serial Number: {patient.serialNumber}</span> - 
              <span className="name"> Name: {patient.name}</span> - 
              <span className="slot"> Slot: {patient.slot}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientList;
