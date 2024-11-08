import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import "@google/model-viewer";

// Keyframes for animations
const rgbEffect = keyframes`
  0% { color: red; }
  33% { color: green; }
  66% { color: blue; }
  100% { color: red; }
`;

const lightningEffect = keyframes`
  0%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff, 0 0 55px #ff00ff, 0 0 75px #ff00ff; }
  50% { text-shadow: none; }
`;

const hoverEffect = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const pulseEffect = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const shakeEffect = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const flickerEffect = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const slideInEffect = keyframes`
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const bounceEffect = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const tiltEffect = keyframes`
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(10deg); }
  100% { transform: rotateY(0deg); }
`;

const zoomEffect = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.2); }
`;

const backgroundColorEffect = keyframes`
  0% { background-color: rgba(0, 0, 0, 0.7); }
  50% { background-color: rgba(255, 0, 0, 0.7); }
  100% { background-color: rgba(0, 0, 0, 0.7); }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  max-width: 1100px;
  gap: 40px; /* space between form and model viewer */
  @media (max-width: 960px) {
    flex-direction: column; /* Stack vertically on smaller screens */
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const ThankYouMessage = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  animation: ${rgbEffect} 3s infinite, ${lightningEffect} 1s infinite, ${slideInEffect} 1s ease-out forwards;

  &:hover {
    animation: 
      ${rgbEffect} 3s infinite, 
      ${lightningEffect} 1s infinite, 
      ${hoverEffect} 0.5s infinite, 
      ${pulseEffect} 1.5s infinite, 
      ${shakeEffect} 1s ease infinite, 
      ${bounceEffect} 1s infinite, 
      ${tiltEffect} 1s infinite;
  }
`;

// Main Contact Component
const Contact = () => {
  const form = useRef();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true); // Optional: Show thank-you message
    form.current.submit(); // Netlify form submission handling
  };

  useEffect(() => {
    // Clear the form data after successful submission (optional)
    if (hasSubmitted) {
      setTimeout(() => setHasSubmitted(false), 3000); // Hide the message after 3 seconds
    }
  }, [hasSubmitted]);

  return (
    <Container id="Contact">
      <Wrapper>
        <div>
          <Title>Contact</Title>
          <Desc>We’d love to hear from you. Reach out to us using the form below!</Desc>
          <ContactForm name="Contact" method="POST" data-netlify="true" ref={form} onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="Contact-Us" />
            <ContactTitle>Get in Touch</ContactTitle>
            <ContactInput type="text" name="name" placeholder="Your Name" required />
            <ContactInput type="email" name="email" placeholder="Your Email" required />
            <ContactInput type="text" name="subject" placeholder="Subject" required />
            <ContactInputMessage name="message" placeholder="Your Message" rows="4" required />
            <ContactButton type="submit">Send Message</ContactButton>
          </ContactForm>
        </div>
        <model-viewer 
          src="path_to_3d_model.glb" 
          alt="3D model" 
          auto-rotate 
          camera-controls 
          style={{ width: '500px', height: '500px' }}
        ></model-viewer>
      </Wrapper>
      {hasSubmitted && (
        <ThankYouMessage>
          Thank you for your message! We'll get back to you soon.
        </ThankYouMessage>
      )}
    </Container>
  );
};

export default Contact;
