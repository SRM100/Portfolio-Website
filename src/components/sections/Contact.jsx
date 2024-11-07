import React, { useRef } from "react";
import styled from "styled-components";
import '@google/model-viewer';

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

// Main Contact Component
const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Netlify will handle the form submission
    form.current.submit();
  };

  return (
    <Container id="Education">
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
          class="robo"
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
    </Container>
  );
};

export default Contact;
