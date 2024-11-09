import React, { useState, useRef, useEffect } from "react";
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
  flex-wrap: wrap;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 12px;
  font-weight: 500;
  margin: 22px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 14px;
  }
`;

const ToggleButton = styled.div`
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease-in-out;
  border: 2px solid transparent;
  background-clip: padding-box;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
    box-shadow: 0 0 10px ${({ theme }) => theme.primary}, 0 0 20px ${({ theme }) => theme.primary};
  }
  @media (max-width: 768px) {
    padding: 10px 12px;
    border-radius: 4px;
    width: 100%;
    text-align: center;
  }
  ${({ active, theme }) =>
    active &&
    `
  background:  ${theme.primary + 20};
  `}
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 6px;
    border: 2px solid;
    border-image: linear-gradient(45deg, red, yellow, green, cyan, blue, violet) 1;
    animation: rgbGlow 1.5s linear infinite;
  }
  @keyframes rgbGlow {
    0% {
      border-color: red;
    }
    33% {
      border-color: yellow;
    }
    66% {
      border-color: green;
    }
    100% {
      border-color: red;
    }
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  &:hover:after {
    opacity: 1;
    box-shadow: 0 0 10px white, 0 0 20px white;
  }
`;

const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
  @media (max-width: 768px) {
    width: 100%;
    height: 1.5px;
  }
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
  const [showToggleBelow, setShowToggleBelow] = useState(false);
  const cardRefs = useRef([]);

  const handleToggle = (category) => {
    setToggle(category);
    setShowToggleBelow(true);
  };

  useEffect(() => {
    if (toggle !== "all") {
      const index = certificates.findIndex(
        (certificate) => certificate.category.toLowerCase() === toggle.toLowerCase()
      );
      if (index !== -1 && cardRefs.current[index]) {
        cardRefs.current[index].scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [toggle]);

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

        {!showToggleBelow && (
          <ToggleButtonGroup>
            {["all", "Udemy", "Great-Learning", "Simplilearn", "Microsoft", "Google", "IBM", "Cisco", "LinkedIn", "EXPO", "Achievements", "Workshops/Events"].map((category) => (
              <>
                <ToggleButton
                  key={category}
                  active={toggle === category}
                  onClick={() => handleToggle(category)}
                >
                  {category.toUpperCase()}
                </ToggleButton>
                <Divider />
              </>
            ))}
          </ToggleButtonGroup>
        )}

        <CardContainer>
          {filteredCertificates.map((certificate, index) => (
            <div key={certificate.title} ref={(el) => (cardRefs.current[index] = el)}>
              <CertificateCard certificate={certificate} />
            </div>
          ))}
        </CardContainer>

        {showToggleBelow && (
          <ToggleButtonGroup className="mobile-toggle-group">
            {["all", "Udemy", "Great-Learning", "Simplilearn", "Microsoft", "Google", "IBM", "Cisco", "LinkedIn", "EXPO", "Achievements", "Workshops/Events"].map((category) => (
              <>
                <ToggleButton
                  key={category}
                  active={toggle === category}
                  onClick={() => handleToggle(category)}
                >
                  {category.toUpperCase()}
                </ToggleButton>
                <Divider />
              </>
            ))}
          </ToggleButtonGroup>
        )}
      </Wrapper>
    </Container>
  );
};

export default Certificates;