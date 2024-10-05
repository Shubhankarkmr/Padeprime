import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './trackAppointment.css'; // Assuming you have a CSS file for styling
import doctorarrive from "./images/doctor-arrive.jpg";
import clock from "./images/clock.jpg";
import patiententer1 from "./images/patient-entering.jpg";
import patiententer2 from "./images/patient-entering2.jpg";
import openclinic from "./images/clinic-opening-icon.png";
import clinicimg from "./images/img1.avif";
const TrackAppointment = () => {
  const [showTimings, setShowTimings] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [nthPatientTime, setNthPatientTime] = useState(null);
  const [n, setN] = useState(null);
  const [yourTime, setYourTime] = useState(null);
  const [originalTime, setOriginalTime] = useState(null);
  const [appointmentData, setAppointmentData] = useState(() => {
    const storedAppointmentData = localStorage.getItem('appointmentData');
    return storedAppointmentData ? JSON.parse(storedAppointmentData) : null;
  });

  useEffect(() => {
    const clickCount = localStorage.getItem('clickCount');
    if (clickCount) {
      setN(parseInt(clickCount));
    }
  }, []);

 

  useEffect(() => {
    if (n !== null && nthPatientTime !== null && checkInTime !== null) {
      const serialNumber = 5; // Replace with your actual serial number
      const averagePatientExitTime = 15; // Replace with your actual average time for one patient to exit (in minutes)
      
      const doctorArrivalTime = new Date(checkInTime);
      doctorArrivalTime.setHours(9, 0, 0, 0); // Setting doctor's arrival time at 9:00 am

      const originalTimeMillis = serialNumber * averagePatientExitTime * 60000 + doctorArrivalTime.getTime();
      setOriginalTime(new Date(originalTimeMillis));

      const exitTimeMillis = nthPatientTime.getTime();
      const calculatedTimeMillis = (serialNumber - n - 1) * averagePatientExitTime * 60000 + exitTimeMillis;
      setYourTime(new Date(calculatedTimeMillis));
    }
  }, [n, nthPatientTime, checkInTime]);

  const fetchCheckInTime = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctor-times/latest-check-in');
      if (response.ok) {
        const data = await response.json();
        if (data.checkInTime) {
          setCheckInTime(new Date(data.checkInTime));
          console.log('Check-in time fetched:', new Date(data.checkInTime));
        } else {
          console.error('Check-in time not found in the response');
        }
      } else {
        console.error('Failed to fetch check-in time, status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching check-in time:', error);
    }
  };

  const fetchNthPatientTime = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/prescription/latest');
      if (response.ok) {
        const data = await response.json();
        if (data.createdAt) {
          setNthPatientTime(new Date(data.createdAt));
          console.log('Nth patient enter time fetched:', new Date(data.createdAt));
        } else {
          console.error('Nth patient enter time not found in the response');
        }
      } else {
        console.error('Failed to fetch nth patient enter time, status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching nth patient enter time:', error);
    }
  };

  const fetchLatestAppointment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/patients/latest');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched latest appointment data:', data); // Debug log
        setAppointmentData(data);
        localStorage.setItem('appointmentData', JSON.stringify(data)); // Store data in localStorage
      } else {
        console.error('Failed to fetch latest appointment data, status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching latest appointment data:', error);
    }
  };

  const handleCheckTimeClick = () => {
    setShowTimings(true);
    fetchCheckInTime();
    fetchNthPatientTime();
  };

  useEffect(() => {
    fetchLatestAppointment();
    const interval = setInterval(() => {
      fetchLatestAppointment();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const formatTime = (time) => {
    if (!time) return 'Fetching...';
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div className="appointment-container">
      <header className="header">
        <button className="track-appointment-button">TRACK YOUR APPOINTMENT</button>
      </header>

      {!appointmentData && (
        <div className="static-content">
          <h2>No appointment data available</h2>
          <p>Please check back later or contact support for assistance.</p>
        </div>
      )}

      {appointmentData && (
        <div className="appointment-card">
          <div className="clinic-info trackclinic">
            <div className="profile-pic"><img src={clinicimg}/></div>
            <div className="clinic-details track">
              <h2>Clinic:Paediprime <Link to="/AppointmentClinic">
                <button className="view-profile-button">View Clinic</button>
              </Link></h2>
              <p><span>Location:</span> Dharmatala, Kolkata</p>
              <p className='doctorname'>Doctor's Name: Dr. Aritra Khan</p>
              <p><span>MBBS, MD (Pediatric)</span></p>
              <p><span>Appointment Date:</span> {new Date(appointmentData.dateofappointment).toLocaleDateString()}</p>
              <p><span>Slot Time: </span>{appointmentData.slot}</p>
              <p><span>Appointment ID:</span> {appointmentData.appointmentNumber}</p>
              <p><span>Sl No.: </span>{appointmentData.serialNumber}</p>
              {/* <Link to="/AppointmentClinic">
                <button className="view-profile-button">View Profile</button>
              </Link> */}
            </div>
          </div>
          <button className="check-time-button" onClick={handleCheckTimeClick}>Check Your Time</button>
        </div>
      )}

      {showTimings && (
        <div className="timing-info">
          <div className="timing-item">
            <i className="icon-doctor"><img src = {openclinic}/></i>
            <p className='middlefont'>Clinic Opening Time</p>
            <div className="timing-details">
              {/* <img src={clock} alt="" /> */}
              <p className='timing'> <img src={clock} alt="" />  8.00 am</p>
            </div>
          </div>
          <div className="timing-item">
            <div className="icon-doctor"><img src = {doctorarrive}/></div>
            <p className='middlefont'>Doctor Arrival Time</p>
            <div className="timing-details">
              {/* <p>Doctor Arrival Time</p> */}
              
              <p className="delayed-time timing">
              <img src={clock} alt="" /> 9.00 am
                
              </p>
              <p className="new-time">{checkInTime ? formatTime(checkInTime) : 'Fetching...'}</p>
            </div>
          </div>
          <div className="timing-item">
            <i className="icon-patient"><img src = {patiententer2}/></i>
            <p className='middlefont'>Patient Number {n} Exit</p>
            <div className="timing-details">
              
              <p className='timing'><img src={clock} alt="" />{nthPatientTime ? formatTime(nthPatientTime) : 'Fetching...'}</p>
            </div>
          </div>
          <div className="timing-item">
            <i className="icon-your-time"><img src = {patiententer1}/></i>
            <p className='middlefont'>Your Time</p>
            <div className="timing-details">
              
              <p className="delayed-time timing">
              <img src={clock} alt="" />
                {originalTime ? formatTime(originalTime) : 'Calculating...'}
              </p>
              <p className="new-time">
                {yourTime ? formatTime(yourTime) : 'Calculating...'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { TrackAppointment };
