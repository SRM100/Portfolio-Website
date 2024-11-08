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
  gap: 40px;
  @media (max-width: 960px) {
    flex-direction: column;
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
  animation: ${rgbEffect} 3s infinite, ${lightningEffect} 1s infinite, ${hoverEffect} 1.5s infinite;
`;

// Main Contact Component
const Contact = () => {
  const form = useRef();
  const [hasSpoken, setHasSpoken] = useState(false);
  const contactRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    form.current.submit();
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
            const selectedVoice = voices.find((voice) => voice.lang === "en-IN") || voices[0];
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
            <ContactInput placeholder="Your Email" name="email" type="email" />
            <ContactInput placeholder="Your Name" name="name" type="text" />
            <ContactInput placeholder="Subject" name="subject" type="text" />
            <ContactInputMessage placeholder="Message" name="message" rows={4} />
            <ContactButton type="submit">Send</ContactButton>
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
          auto-rotate
          rotation-per-second="20deg"
          autoplay
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "500px",
            border: "1px solid #ccc"
          }}
        />
      </Wrapper>
      <ThankYouMessage>
        Thank you for visiting my website
      </ThankYouMessage>
    </Container>
  );
};

export default Contact;
