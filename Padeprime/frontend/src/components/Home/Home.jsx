import React, { useEffect } from 'react';
import './Home.css';
import banner_image1 from './images/banner_image.png';  // Rename to avoid spaces
import banner_image2 from './images/banner_image2.png'; 
import banner_image3 from './images/banner_image3.png'; 
import findDoctor from './images/newdoctorimage.png';  // Rename to avoid spaces
import findClinic from './images/newfindclinic.png';
import treatmentData from './images/newtreatmentdata.png';  // Rename to avoid spaces
import trackAppointment from './images/newtrackappointment.png';
import doctorInterface from './images/newdoctorinterface.png';  // Rename to avoid spaces
import healthCoins from './images/newhealthcoins.png';
import medicalArticle from './images/riskanalysis.png';  // Rename to avoid spaces
import childrenWithDoctor from './images/children picture with doctor.jpg'; 
import patient_list from './images/newpatientlist.png';  // Rename to avoid spaces
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let currentIndex = 0;
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;

    const showNextSlide = () => {
      currentIndex++;
      slides.style.transition = 'transform 1s ease';
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Loop back to the first slide seamlessly
      if (currentIndex === totalSlides - 1) {
        setTimeout(() => {
          slides.style.transition = 'none';
          slides.style.transform = 'translateX(0)';
          currentIndex = 0;
          // Force reflow to reset transition
          void slides.offsetWidth;
          slides.style.transition = 'transform 1s ease';
        }, 1000); // This timeout should match the transition duration
      }
    };

    const interval = setInterval(showNextSlide, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleNavigation = (path) => {
    if (path === '/doctor-interface') {
      navigate('/logindoctor');
    } else {
      if (!localStorage.getItem('authToken')) {
        navigate('/loginuser');
      } else {
        navigate(path);
      }
    }
  };

  return (
    <div className="home">
      <div className="banner-card">
        <img src={childrenWithDoctor} alt="Children with Doctor" /> 
        <div className="banner-text">
          <h1>India's First<br /> Affordable Next <br /> Generation Pediatrics<br /> Clinic Services<br /></h1>
          <p>A baby's smile is one of the <br /> most beautiful treasures in <br /> the world, so their happiness <br /> is most vital to us. We treat <br /> your child as if they were our <br /> own little brother or sister.</p>
        </div>
      </div>

      <div className="banner">
        <div className="slider">
          <div className="slides">
            <div className="slide"><img src={banner_image1} alt="Image 1" /></div>
            <div className="slide"><img src={banner_image2} alt="Image 2" /></div>
            <div className="slide"><img src={banner_image3} alt="Image 3" /></div>
            <div className="slide"><img src={banner_image1} alt="Image 4" /></div>
          </div>
        </div>
      </div>

      <div className="icon-container">
        <div className="icon" onClick={() => navigate('/finddoctor')}>
          <img src={findDoctor} alt="Doctor Icon" />
          <div className="icon-label">Find Doctor</div>
        </div>
        
        <div className="icon" onClick={() => navigate('/map')}>
          <img src={findClinic} alt="Clinic Icon" />
          <div className="icon-label">Book Appointment</div>
        </div>
        
        <div className="icon" onClick={() => handleNavigation('/profile2')}>
          <img src={treatmentData} alt="Treatment Data Icon" />
          <div className="icon-label">Your Treatment Data</div>
        </div>
        
        <div className="icon" onClick={() => handleNavigation('/trackAppointment')}>
          <img src={trackAppointment} alt="Track Appointment Icon" />
          <div className="icon-label">Track Your Appointment</div>
        </div>
        
        <div className="icon" onClick={() => handleNavigation('/doctor-interface')}>
          <img src={doctorInterface} alt="Doctor Interface Icon" />
          <div className="icon-label">Doctor's Interface</div>
        </div>
        <div className="icon" onClick={() => handleNavigation('#')}>
          <img src={patient_list} alt="Patient List" />
          <div className="icon-label">Patient List</div>
        </div>
        
        <div className="icon" onClick={() => handleNavigation('/healthcoins')}>
          <img src={healthCoins} alt="Health Coins Icon" />
          <div className="icon-label">Health Coins</div>
        </div>
        
        <div className="icon" onClick={() => handleNavigation('/medicalarticle')}>
          <img src={medicalArticle} alt="Medical Article Icon" />
          <div className="icon-label">Risk Analysis</div>
        </div>
        
        
      </div>
      
      <div className="join-us">
        <p>Join us today and experience the future of healthcare.</p>
        <a href="/loginuser" className="signup-login-btn">Login</a>
      </div>
    </div>
  );
};

export default Home;