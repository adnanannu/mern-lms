import React from 'react';
import img from '/00.mp4';

const AboutUs = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
     
      
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      marginBottom:"150px"
     
    },
    heading: {
      fontSize: '3rem',
      color: '#333',
    
      
      fontWeight: '700',
      animation: 'fadeIn 2s ease-out',
    },
    paragraph: {
      fontSize: '1.2rem',
      color: '#555',
      maxWidth: '800px',
      lineHeight: '1.8',
      
      animation: 'slideIn 1.5s ease-out',
    },
    card: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      
      backgroundColor: '#FB8C00',
      borderRadius: '15px',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
      padding: '40px',
      width: '80%',
      maxWidth: '1000px',
      animation: 'bounceIn 2s ease-out',
      
    },
    leftColumn: {
      flex: '1',
      marginRight: '20px',
    },
    rightColumn: {
      flex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardItem: {
      padding: '20px',
      margin: '10px',
      textAlign: 'left',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '15px',
      textTransform: 'uppercase',
    },
    cardDescription: {
      fontSize: '1rem',
      color: '#777',
      lineHeight: '1.6',
    },
    video: {
      width: '100%',
      height: 'auto',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <p style={styles.paragraph}>
        Welcome to our company! We are dedicated to providing the best service to our customers
        and creating meaningful experiences. Our team is passionate about innovation and driven by
        excellence.
      
       
      </p>

      <div style={styles.card}>
        {/* Left Column with Content */}
        <div style={styles.leftColumn}>
          <div style={styles.cardItem}>
            <h2 style={styles.cardTitle}>Our Vision</h2>
            <p style={styles.cardDescription}>
              Our vision is to be the leading provider of high-quality services that help our
              clients achieve their goals and grow their businesses. Our vision is to be the leading provider of high-quality services that help our
              clients achieve their goals and grow their businesses.
            </p>
          </div>
          <div style={styles.cardItem}>
            <h2 style={styles.cardTitle}>Our Values</h2>
            <p style={styles.cardDescription}>
              We value integrity, transparency, and customer satisfaction. We strive to provide
              the best experience possible in everything we do.
            
            </p>
          </div>
        </div>

        {/* Right Column with Video */}
        <div style={styles.rightColumn}>
          <video style={styles.video} controls>
            <source src={img} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AboutUs;
