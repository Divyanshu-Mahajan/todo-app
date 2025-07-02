import React from 'react';
import Card from '../UI/Card';
import styles from './About.module.css'
import NotepadLogo from '../assets/Logo.png'
import DevImage from '../assets/DevImage.jpg'
import { FaGithub,FaCheck } from 'react-icons/fa';

const About = () => {
  return (
    <Card>
      <div className={styles.about}>
        <header className="card-heading centered">
          <h2>About This Todo App</h2>
        </header>
        <div className={styles["about__inner"]}>
          <div className={styles["about__inner__left"]}>
            <p>
              This Todo App is a simple yet powerful task management tool designed to help you
              organize your day-to-day activities with ease.
            </p>

            <h3 style={{marginTop : "1rem"}}>✨ Features:</h3>
            <ul>
              <li><FaCheck /><span style={{ marginLeft : "0.5rem"}}>Create, edit, and delete todos</span></li>
              <li><FaCheck /><span style={{ marginLeft : "0.5rem"}}>Mark tasks as completed or pending</span></li>
              <li><FaCheck /><span style={{ marginLeft : "0.5rem"}}>View todos filtered by status</span></li>
              <li><FaCheck /><span style={{ marginLeft : "0.5rem"}}>View detailed information for each task</span></li>
              <li><FaCheck /><span style={{ marginLeft : "0.5rem"}}>Live status toggle with toast notifications</span></li>
              <li><FaCheck /><span style={{ marginLeft : "0.5rem"}}>Responsive UI with routing and state management</span></li>
            </ul>

            <h3 style={{marginTop : "1rem"}}>🛠 Tech Stack:</h3>
            <ul>
              <li><strong>Frontend:</strong> React, React Router, Toastify, React Icons</li>
              <li><strong>Backend:</strong> Firebase Realtime Database</li>
              <li><strong>Styling:</strong> CSS Modules</li>
            </ul>
            <h3 style={{marginTop : "1rem"}}>👨‍💻 Developer:</h3>
            <div className={styles.profile}>
              <img src={DevImage} alt="Divyanshu Mahajan" />
              <div>
                <p><strong>Divyanshu Mahajan</strong></p>
                <p>Intern at Ziion Technology, Mohali</p>
                <a href="https://github.com/Divyanshu-Mahajan" target="_blank" rel="noopener noreferrer" style={{alignItems : "center"}}>
                  <FaGithub/> <span style={{marginLeft:"0.5rem"}}>Visit GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>
          <div className={styles["about__inner__right"]}>
            <div className={styles["image-section"]}>
              <img src={NotepadLogo} alt='Notepad-logo' />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default About;
