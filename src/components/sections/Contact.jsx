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
  0%, 100% { box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff, 0 0 55px #ff00ff, 0 0 75px #ff00ff; }
  50% { box-shadow: none; }
`;

const whiteLightningEffect = keyframes`
  0%, 100% { box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff, 0 0 55px #fff, 0 0 75px #fff; }
  50% { box-shadow: none; }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${rgbEffect} 3s infinite;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  max-width: 1100px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
  animation: ${rgbEffect} 3s infinite;
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  animation: ${rgbEffect} 3s infinite;
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  animation: ${rgbEffect} 3s infinite;
`;

const ContactForm = styled.form`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 12px;
  gap: 12px;
  animation: ${rgbEffect} 3s infinite, ${lightningEffect} 1s infinite;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  animation: ${rgbEffect} 3s infinite;
`;

const ContactInput = styled.input`
  font-size: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  animation: ${rgbEffect} 3s infinite;
`;

const ContactInputMessage = styled.textarea`
  font-size: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  animation: ${rgbEffect} 3s infinite;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  animation: ${rgbEffect} 3s infinite;
`;

const ContactButton = styled.button`
  padding: 13px 16px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${rgbEffect} 3s infinite;

  &:hover {
    animation: ${lightningEffect} 1s infinite, ${rgbEffect} 3s infinite;
  }
`;

const ThankYouMessage = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  animation: ${rgbEffect} 3s infinite, ${lightningEffect} 1s infinite;
`;

const SuccessMessage = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  animation: ${rgbEffect} 3s infinite;
`;

const PopUpMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  animation: ${whiteLightningEffect} 1s infinite;
`;

const ModelViewer = styled.div`
  width: 800px;
  height: 800px;
  max-width: 100%;
  display: block;

  @media (max-width: 1200px) {
    width: 600px;
    height: 600px;
  }

  @media (max-width: 960px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 600px) {
    width: 300px;
    height: 300px;
  }
`;

const Contact = () => {
  const form = useRef();
  const [hasSpoken, setHasSpoken] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const contactRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    fetch("https://formspree.io/f/mzzbgpoy", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        setIsSubmitted(true);
        setShowPopUp(true);
        setTimeout(() => setShowPopUp(false), 3000); // Hide pop-up after 3 seconds
      } else {
        alert("There was an error submitting the form");
      }
    });
  };

  const handleReset = () => {
    form.current.reset();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasSpoken) {
          const speak = (text) => {
            const speech = new SpeechSynthesisUtterance(text);
            speech.pitch = 1;
            speech.rate = 1;
            speech.volume = 1;
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
          <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
          <ContactForm
            onSubmit={handleSubmit}
            ref={form}
          >
            <ContactTitle>Email Me 🚀</ContactTitle>
            <ContactInput placeholder="Your Email" name="email" type="email" required />
            <ContactInput placeholder="Your Name" name="name" type="text" required />
            <ContactInput placeholder="Subject" name="subject" type="text" required />
            <ContactInputMessage placeholder="Message" name="message" rows={4} required />
            <ButtonContainer>
              <ContactButton type="button" onClick={handleReset}>Reset</ContactButton>
              <ContactButton type="submit">Send</ContactButton>
            </ButtonContainer>
          </ContactForm>
        </div>

        <ModelViewer>
          <model-viewer 
            src="./models/robot_playground/scene.gltf" 
            camera-controls
            disable-pan
            disable-zoom
            interaction-prompt="none"
            field-of-view="10deg"
            autoplay
            style={{ width: "100%", height: "100%" }}
          ></model-viewer>
        </ModelViewer>
      </Wrapper>
      <ThankYouMessage>Thank you for visiting my website</ThankYouMessage>
      {showPopUp && <PopUpMessage>Thanks! The form was submitted successfully.</PopUpMessage>}
    </Container>
  );
};

export default Contact;
