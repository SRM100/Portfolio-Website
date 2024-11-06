import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  /* Your styles here */
`;

const Wrapper = styled.div`
  /* Your styles here */
`;

const Desc = styled.p`
  /* Your styles here */
`;

const ContactForm = styled.form`
  /* Your styles here */
`;

const ContactTitle = styled.h2`
  /* Your styles here */
`;

const ContactInput = styled.input`
  /* Your styles here */
`;

const ContactInputMessage = styled.textarea`
  /* Your styles here */
`;

const ContactButton = styled.input`
  /* Your styles here */
`;

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
  };

  return (
    <Container>
      <Wrapper>
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="email" type="email" />
          <ContactInput placeholder="Your Name" name="name" type="text" />
          <ContactInput placeholder="Subject" name="subject" type="text" />
          <ContactInputMessage placeholder="Message" name="message" rows={4} />
          <ContactButton type="submit" value="Send" />
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
