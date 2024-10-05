// import React, { useState, useEffect } from 'react';
// import './App.css';
// import axios from 'axios';

// function DoctorAppointment() {
//   const [patientLists, setPatientLists] = useState({
//     '9Am-11Am': [],
//     '2pm-4pm': [],
//     '7pm-9pm': []
//   });

//   const [patientDetails, setPatientDetails] = useState({
//     name: '',
//     fathersName: '',
//     mothersName: '',
//     dateOfBirth: '',
//     dateofappointment: '',
//     age: '',
//     gender: '',
//     address: '',
//     slot: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [doctor, setDoctor] = useState(null);

//   useEffect(() => {
//     const storedDoctorName = localStorage.getItem('selectedDoctorName');
//     if (storedDoctorName) {
//       fetchDoctorDetails(storedDoctorName);
//     }

//     setLoading(true);
//     axios.get('http://localhost:5000/api/patients2')
//       .then(response => {
//         const groupedPatients = response.data.reduce((acc, patient) => {
//           acc[patient.slot] = [...(acc[patient.slot] || []), patient];
//           return acc;
//         }, {});
//         setPatientLists(groupedPatients);
//       })
//       .catch(error => {
//         console.error('Error fetching patient data:', error);
//         setError('Error fetching patient data.');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const fetchDoctorDetails = (doctorName) => {
//     axios.get(`http://localhost:5000/api/doctor-details?name=${encodeURIComponent(doctorName)}`)
//       .then(response => {
//         setDoctor(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching doctor details:', error);
//         setError('Error fetching doctor details.');
//       });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPatientDetails({
//       ...patientDetails,
//       [name]: value
//     });

//     // If dateOfBirth changes, calculate the age
//     if (name === 'dateOfBirth') {
//       const calculatedAge = calculateAge(value);
//       setPatientDetails({
//         ...patientDetails,
//         dateOfBirth: value,
//         age: calculatedAge
//       });
//     }
//   };
//   const calculateAge = (dob) => {
//     const birthDate = new Date(dob);
//     const today = new Date();
  
//   // Calculate the year difference
//   let years = today.getFullYear() - birthDate.getFullYear();
  
//   // Calculate the month difference
//   let months = today.getMonth() - birthDate.getMonth();
  
//   // Adjust the total number of years and months if necessary
//   if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
//     years--;
//     months += 12; // Add 12 months to correct the negative month difference
//   }
  
//   // Total age in months
//   const ageInMonths = (years * 12) + months;
  
//   return ageInMonths.toString();// Convert age to string as form expects string inputs
//   };
//   const handleSubmitAppointment = (e) => {
//     e.preventDefault();
//     const {
//       name,
//       age,
//       gender,
//       dateOfBirth,
//       dateofappointment,
//       address,
//       fathersName,
//       mothersName,
//       slot
//     } = patientDetails;
  
//     // Check if all required fields are filled
//     if (
//       name &&
//       age &&
//       gender &&
//       dateOfBirth &&
//       dateofappointment &&
//       address &&
//       fathersName &&
//       mothersName &&
//       slot
//     ) {
//       console.log('Patient Details: ', patientDetails); // Add log to inspect the data
//       console.log('Doctor Details: ', doctor); // Log the doctor details being sent
  
//       setLoading(true);
//       setError('');
  
//       axios.post('http://localhost:5000/api/patients', {
//         ...patientDetails,
//         doctorname: doctor.name, // Include doctorname in the appointment data
//         clinicLocation: doctor.location // Include clinicLocation in the appointment data
//       })
//       .then(response => {
//         alert(`Appointment booked with Dr. ${doctor?.name} at ${doctor?.location}. Appointment number: ${response.data.appointmentNumber}`);
//         const updatedLists = {
//           ...patientLists,
//           [response.data.slot]: [...patientLists[response.data.slot], response.data]
//         };
//         setPatientLists(updatedLists);
//         setPatientDetails({
//           name: '',
//           fathersName: '',
//           mothersName: '',
//           dateOfBirth: '',
//           dateofappointment: '',
//           age: '',
//           gender: '',
//           address: '',
//           slot: ''
//         });
//       })
//       .catch(error => {
//         console.error('Error submitting appointment:', error); // This will log the error details
//         setError('Error booking appointment. Please try again later.');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//     } else {
//       alert('Please fill in all the fields.');
//     }
//   };
  
  

//   const clearPatientLists = () => {
//     setPatientLists({
//       '9Am-11Am': [],
//       '2pm-4pm': [],
//       '7pm-9pm': []
//     });
//   };

//   return (
//     <div className="doctor-appointment-container">
//       <div className="middle-section">
//         <div className="doctor-de">
//           <h1 id="a" className='hd'>Doctor Information</h1>
//           {doctor ? (
//             <>
//               <img src={doctor.image} alt="doctor" />
//               <p>
//                 <strong>Name:</strong> {doctor.name}<br />
//                 <strong>Specialty:</strong> {doctor.specialty}<br />
//                 <strong>Clinic Time:</strong> {doctor.clinicTime}<br />
//                 <strong>Location:</strong> {doctor.location}<br />
//                 <strong>Consultation Fees:</strong> {doctor.consultationFees} (may vary)<br />
//                 <strong>Contact:</strong> Mobile: +919832457567<br />
//                 <strong>About Dr. {doctor.name}:</strong> {doctor.about}<br />
//               </p>
//             </>
//           ) : (
//             <p>Loading doctor information...</p>
//           )}
//         </div>
//       </div>

//       <div className="middle-section">
//         <div className="book-appointment2">
//           <div className="appointment-details2">
//             <h2 id="f2">Book Appointment with Dr. {doctor?.name}</h2>
//             <form onSubmit={handleSubmitAppointment}>
//               {error && <p className="error">{error}</p>}
//               <div className="form-group">
//                 <label>Name:</label>
//                 <input type="text" name="name" value={patientDetails.name} onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Father's Name:</label>
//                 <input type="text" name="fathersName" value={patientDetails.fathersName} onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Mother's Name:</label>
//                 <input type="text" name="mothersName" value={patientDetails.mothersName} onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Date of Appointment:</label>
//                 <input type="date" name="dateofappointment" value={patientDetails.dateofappointment} onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Slot:</label>
//                 <select name="slot" value={patientDetails.slot} onChange={handleInputChange}>
//                   <option value="">Choose your slot</option>
//                   <option value="9Am-11Am">9Am-11Am</option>
//                   <option value="2pm-4pm">2pm-4pm</option>
//                   <option value="7pm-9pm">7pm-9pm</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Date of Birth:</label>
//                 <input type="date" name="dateOfBirth" value={patientDetails.dateOfBirth} onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Age(Months):</label>
//                 <input type="text" name="age" value={patientDetails.age} readOnly /> {/* Age is now read-only */}
//               </div>
//               <div className="form-group">
//                 <label>Gender:</label>
//                 <select name="gender" value={patientDetails.gender} onChange={handleInputChange}>
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="others">Others</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Address:</label>
//                 <input type="text" name="address" value={patientDetails.address} onChange={handleInputChange} />
//               </div>
//               <button type="submit" disabled={loading}>
//                 {loading ? 'Submitting...' : 'Submit'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       <div className="patient-list">
//         <h2 id="f">Booking Information</h2>
//         <div className="slot-list">
//           {Object.keys(patientLists).map(slot => (
//             <div key={slot}>
//               <h3>{slot}</h3>
//               {patientLists[slot].length === 0 ? (
//                 <p>No appointments booked yet for this slot.</p>
//               ) : (
//                 <ul>
//                   {patientLists[slot].map((patient, index) => (
//                     <li key={index}>
//                       <strong>Serial Number:</strong> {patient.serialNumber}, 
//                       <strong>Name:</strong> {patient.name}, 
//                       <strong>Age:</strong> {patient.age}, 
//                       <strong>Gender:</strong> {patient.gender}, 
//                       <strong>Address:</strong> {patient.address}, 
//                       <strong>Date of Birth:</strong> {patient.dateOfBirth}, 
//                       <strong>Father's Name:</strong> {patient.fathersName}, 
//                       <strong>Mother's Name:</strong> {patient.mothersName}, 
//                       <strong>Slot:</strong> {patient.slot}, 
//                       <strong>Appointment Number:</strong> {patient.appointmentNumber}, 
//                       <strong>Date of Appointment:</strong> {patient.dateofappointment}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//         <button onClick={clearPatientLists}>
//           Clear
//         </button>
//       </div>
//     </div>
//   );
// }

// export { DoctorAppointment };
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function DoctorAppointment() {
  const [patientLists, setPatientLists] = useState({
    '9Am-11Am': [],
    '2pm-4pm': [],
    '7pm-9pm': []
  });

  const [patientDetails, setPatientDetails] = useState({
    name: '',
    fathersName: '',
    mothersName: '',
    dateOfBirth: '',
    dateofappointment: '',
    age: '',
    gender: '',
    address: '',
    slot: '',
    image: null // Add an image field to the patientDetails
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const storedDoctorName = localStorage.getItem('selectedDoctorName');
    if (storedDoctorName) {
      fetchDoctorDetails(storedDoctorName);
    }

    setLoading(true);
    axios.get('http://localhost:5000/api/patients2')
      .then(response => {
        const groupedPatients = response.data.reduce((acc, patient) => {
          acc[patient.slot] = [...(acc[patient.slot] || []), patient];
          return acc;
        }, {});
        setPatientLists(groupedPatients);
      })
      .catch(error => {
        console.error('Error fetching patient data:', error);
        setError('Error fetching patient data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchDoctorDetails = (doctorName) => {
    axios.get(`http://localhost:5000/api/doctor-details?name=${encodeURIComponent(doctorName)}`)
      .then(response => {
        setDoctor(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor details:', error);
        setError('Error fetching doctor details.');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({
      ...patientDetails,
      [name]: value
    });

    // If dateOfBirth changes, calculate the age
    if (name === 'dateOfBirth') {
      const calculatedAge = calculateAge(value);
      setPatientDetails({
        ...patientDetails,
        dateOfBirth: value,
        age: calculatedAge
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPatientDetails({
        ...patientDetails,
        image: file // Store the image file in state
      });
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }
    const ageInMonths = (years * 12) + months;
    return ageInMonths.toString();
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    const {
      name,
      age,
      gender,
      dateOfBirth,
      dateofappointment,
      address,
      fathersName,
      mothersName,
      slot,
      image // Include the image field
    } = patientDetails;

    if (
      name &&
      age &&
      gender &&
      dateOfBirth &&
      dateofappointment &&
      address &&
      fathersName &&
      mothersName &&
      slot
    ) {
      const formData = new FormData(); // Use FormData to handle file uploads
      formData.append('name', name);
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('dateofappointment', dateofappointment);
      formData.append('address', address);
      formData.append('fathersName', fathersName);
      formData.append('mothersName', mothersName);
      formData.append('slot', slot);
      formData.append('image', image); // Append the image file

      setLoading(true);
      setError('');

      axios.post('http://localhost:5000/api/patients', {
        ...patientDetails,
        doctorname: doctor.name,
        clinicLocation: doctor.location
      })
      .then(response => {
        alert(`Appointment booked with Dr. ${doctor?.name} at ${doctor?.location}. Appointment number: ${response.data.appointmentNumber}`);
        const updatedLists = {
          ...patientLists,
          [response.data.slot]: [...patientLists[response.data.slot], response.data]
        };
        setPatientLists(updatedLists);
        setPatientDetails({
          name: '',
          fathersName: '',
          mothersName: '',
          dateOfBirth: '',
          dateofappointment: '',
          age: '',
          gender: '',
          address: '',
          slot: '',
          image: null // Reset image field
        });
      })
      .catch(error => {
        console.error('Error submitting appointment:', error);
        setError('Error booking appointment. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      alert('Please fill in all the fields.');
    }
  };

  const clearPatientLists = () => {
    setPatientLists({
      '9Am-11Am': [],
      '2pm-4pm': [],
      '7pm-9pm': []
    });
  };

  return (
    <div className="doctor-appointment-container">
      <div className="middle-section">
        <div className="doctor-de">
          <h1 id="a" className='hd'>Doctor Information</h1>
          {doctor ? (
            <>
              <img src={doctor.image} alt="doctor" />
              <p>
                <strong>Name:</strong> {doctor.name}<br />
                <strong>Specialty:</strong> {doctor.specialty}<br />
                <strong>Clinic Time:</strong> {doctor.clinicTime}<br />
                <strong>Location:</strong> {doctor.location}<br />
                <strong>Consultation Fees:</strong> {doctor.consultationFees} (may vary)<br />
                <strong>Contact:</strong> Mobile: +919832457567<br />
                <strong>About Dr. {doctor.name}:</strong> {doctor.about}<br />
              </p>
            </>
          ) : (
            <p>Loading doctor information...</p>
          )}
        </div>
      </div>

      <div className="middle-section">
        <div className="book-appointment2">
          <div className="appointment-details2">
            <h2 id="f2">Book Appointment with Dr. {doctor?.name}</h2>
            <form onSubmit={handleSubmitAppointment}  encType="multipart/form-data">
              {error && <p className="error">{error}</p>}
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={patientDetails.name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Father's Name:</label>
                <input type="text" name="fathersName" value={patientDetails.fathersName} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Mother's Name:</label>
                <input type="text" name="mothersName" value={patientDetails.mothersName} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Date of Appointment:</label>
                <input type="date" name="dateofappointment" value={patientDetails.dateofappointment} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Slot:</label>
                <select name="slot" value={patientDetails.slot} onChange={handleInputChange}>
                  <option value="">Choose your slot</option>
                  <option value="9Am-11Am">9Am-11Am</option>
                  <option value="2pm-4pm">2pm-4pm</option>
                  <option value="7pm-9pm">7pm-9pm</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth:</label>
                <input type="date" name="dateOfBirth" value={patientDetails.dateOfBirth} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Age (Months):</label>
                <input type="text" name="age" value={patientDetails.age} readOnly />
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <select name="gender" value={patientDetails.gender} onChange={handleInputChange}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input type="text" name="address" value={patientDetails.address} onChange={handleInputChange} />
              </div>
              <div className="form-group">
              <label>Upload Image:</label>
              <input type="file" name="image" accept=".jpg,.jpeg,.png" onChange={handleImageChange} required />
                   </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="patient-list">
        <h2 id="f">Booking Information</h2>
        <div className="slot-list">
          {Object.keys(patientLists).map(slot => (
            <div key={slot}>
              <h3>{slot}</h3>
              {patientLists[slot].length === 0 ? (
                <p>No appointments booked yet for this slot.</p>
              ) : (
                <ul>
                  {patientLists[slot].map((patient, index) => (
                    <li key={index}>
                      <strong>Serial Number:</strong> {patient.serialNumber}, 
                      <strong>Name:</strong> {patient.name}, 
                      <strong>Age:</strong> {patient.age}, 
                      <strong>Gender:</strong> {patient.gender}, 
                      <strong>Address:</strong> {patient.address}, 
                      <strong>Date of Birth:</strong> {patient.dateOfBirth}, 
                      <strong>Father's Name:</strong> {patient.fathersName}, 
                      <strong>Mother's Name:</strong> {patient.mothersName}, 
                      <strong>Slot:</strong> {patient.slot}, 
                      <strong>Appointment Number:</strong> {patient.appointmentNumber}, 
                      <strong>Date of Appointment:</strong> {patient.dateofappointment}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <button onClick={clearPatientLists}>
          Clear
        </button>
      </div>
    </div>
  );
}

export { DoctorAppointment };
