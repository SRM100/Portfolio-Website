import React, { useState } from "react";
import styled from "styled-components";
import { certificates } from "../../data/constants";
import CertificateCard from "../cards/CertificateCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  padding: 0px 16px;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
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

const ToggleButtonGroup = styled.div`
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 12px;
  font-weight: 500;
  margin: 22px 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ToggleButton = styled.div`
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
  @media (max-width: 768px) {
    padding: 6px 8px;
    border-radius: 4px;
  }
  ${({ active, theme }) =>
    active &&
    `
  background:  ${theme.primary + 20};
  `}
`;

const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
`;

const Certificates = () => {
  const [toggle, setToggle] = useState("all");

  const filteredCertificates = toggle === "all"
    ? certificates
    : certificates.filter((certificate) => certificate.category.toLowerCase() === toggle.toLowerCase());

  return (
    <Container id="Certificates">
      <Wrapper>
        <Title>Certificates</Title>
        <Desc style={{ marginBottom: "40px" }}>
          Here are some of the certificates I've earned.
        </Desc>

        <ToggleButtonGroup>
          <ToggleButton active={toggle === "all"} onClick={() => setToggle("all")}>ALL</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "Udemy"} onClick={() => setToggle("Udemy")}>UDEMY</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "Great-Learning"} onClick={() => setToggle("Great-Learning")}>GREAT LEARNING</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "Simplilearn"} onClick={() => setToggle("Simplilearn")}>SIMPLILEARN</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "Microsoft"} onClick={() => setToggle("Microsoft")}>MICROSOFT</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "Google"} onClick={() => setToggle("Google")}>GOOGLE</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "IBM"} onClick={() => setToggle("IBM")}>IBM</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "Cisco"} onClick={() => setToggle("Cisco")}>CISCO</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "LinkedIn"} onClick={() => setToggle("LinkedIn")}>LINKEDIN</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "EXPO"} onClick={() => setToggle("EXPO")}>EXPO</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "Achievements"} onClick={() => setToggle("Achievements")}>ACHIEVEMENTS</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "Workshops/Events"} onClick={() => setToggle("Workshops/events")}>WORKSHOPS/EVENTS</ToggleButton>
          <Divider />
        </ToggleButtonGroup>

        <CardContainer>
          {filteredCertificates.map((certificate) => (
            <CertificateCard key={certificate.title} certificate={certificate} />
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Certificates;