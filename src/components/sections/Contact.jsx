import React, { useRef, useEffect, useState } from "react";
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
  padding: 20px;
  background-color: rgba(17, 25, 40, 0.83);
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

const Title = styled.h1`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: #ffffff;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: #cccccc;
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
  animation: ${slideInEffect} 1s ease-out forwards;

  &:hover {
    animation: ${pulseEffect} 1.5s infinite, ${shakeEffect} 1s ease infinite;
  }
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: #ffffff;
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  outline: none;
  font-size: 18px;
  color: #ffffff;
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid #007bff;
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  outline: none;
  font-size: 18px;
  color: #ffffff;
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid #007bff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContactButton = styled.button`
  width: 48%;
  text-decoration: none;
  text-align: center;
  background: #007bff;
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  animation: ${lightningEffect} 1s infinite;

  &:hover {
    background: #0056b3;
    transform: scale(1.05);
  }
`;

const ResetButton = styled(ContactButton)`
  background: #ff0000;
  &:hover {
    background: #cc0000;
  }
`;

const ThankYouMessage = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  color: #ffffff;
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
  const [hasSpoken, setHasSpoken] = useState(false);
  const contactRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Netlify will handle the form submission
    form.current.submit();
  };

  const handleReset = () => {
    form.current.reset();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('IntersectionObserver entry:', entry);
        if (entry.isIntersecting && !hasSpoken) {
          const speak = (text) => {
            const speech = new SpeechSynthesisUtterance(text);
            speech.pitch = 1; // Adjust pitch (0 to 2)
            speech.rate = 1; // Adjust rate (0.1 to 10)
            speech.volume = 1; // Adjust volume (0 to 1)
            
            // Select a specific voice if available
            const voices = window.speechSynthesis.getVoices();
            const selectedVoice = voices.find(voice => voice.lang === 'en-IN') || voices[0];
            speech.voice = selectedVoice;

            window.speechSynthesis.speak(speech);
          };

          speak("Thank you for visiting my website");
          setHasSpoken(true);
        }
      },
      { threshold: 0.5 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, [hasSpoken]);

  return (
    <Container id="Contact" ref={contactRef}>
      <Wrapper>
        <div>
          <Title>Contact</Title>
          <Desc style={{ marginBottom: "40px" }}>
            Feel free to reach out to me for any questions or opportunities!
          </Desc>

          <ContactForm
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            ref={form}
          >
            <input type="hidden" name="form-name" value="contact" />
            <ContactTitle>Email Me 🚀</ContactTitle>
            <p>
              <label>Name <ContactInput type="text" name="name" required /></label>
            </p>
            <p>
              <label>Email <ContactInput type="email" name="email" required /></label>
            </p>
            <p>
              <label>Subject <ContactInput type="text" name="subject" required /></label>
            </p>
            <p>
              <label>Message <ContactInputMessage name="message" rows={4} required /></label>
            </p>
            <ButtonContainer>
              <ResetButton type="button" onClick={handleReset}>Reset</ResetButton>
              <ContactButton type="submit">Send</ContactButton>
            </ButtonContainer>
          </ContactForm>
        </div>

        {/* Model Viewer */}
        <model-viewer 
          className="robo"
          src="./models/robot_playground/scene.gltf" 
          camera-controls
          disable-pan
          disable-zoom
          interaction-prompt="none"
          field-of-view="10deg"
          autoplay
          style={{ 
            width: "800px", 
            height: "800px", 
            maxWidth: "100%", 
            display: "block"  /* Ensure the model is visible */
          }}
        ></model-viewer>

      </Wrapper>
      <ThankYouMessage>
        Thank you for visiting my website
      </ThankYouMessage>
    </Container>
  );
};

export default Contact;
