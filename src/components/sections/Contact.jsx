import React, { useRef, useEffect, useState } from "react"; 
import styled, { keyframes } from "styled-components";
import emailjs from 'emailjs-com';
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

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  max-width: 1100px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ContactForm = styled.form`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 12px;
  gap: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ContactInput = styled.input`
  font-size: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ccc;
`;

const ContactInputMessage = styled.textarea`
  font-size: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ccc;
`;

const ContactButton = styled.button`
  padding: 13px 16px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const ThankYouMessage = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  animation: ${rgbEffect} 3s infinite, ${lightningEffect} 1s infinite;
`;

const ContactLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Contact = () => {
  const form = useRef();
  const [hasSpoken, setHasSpoken] = useState(false);
  const contactRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
      .then((result) => {
          console.log(result.text);
          alert("Message sent successfully!");
      }, (error) => {
          console.log(error.text);
          alert("Failed to send message, please try again.");
      });
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
          <ContactForm ref={form} onSubmit={handleSubmit}>
            <ContactTitle>Email Me 🚀</ContactTitle>
            <ContactInput placeholder="Your Email" name="email" type="email" required />
            <ContactInput placeholder="Your Name" name="name" type="text" required />
            <ContactInput placeholder="Subject" name="subject" type="text" required />
            <ContactInputMessage placeholder="Message" name="message" rows={4} required />
            <ContactButton type="submit">Send</ContactButton>
          </ContactForm>
          <ContactLink href="mailto:rjkm3169@gmail.com">Contact me at rjkm3169@gmail.com</ContactLink>
        </div>

        <model-viewer 
          src="./models/robot_playground/scene.gltf" 
          camera-controls
          disable-pan
          disable-zoom
          interaction-prompt="none"
          field-of-view="10deg"
          autoplay
          style={{ width: "800px", height: "800px", maxWidth: "100%", display: "block" }}
        ></model-viewer>
      </Wrapper>
      <ThankYouMessage>Thank you for visiting my website</ThankYouMessage>
    </Container>
  );
};

export default Contact;
