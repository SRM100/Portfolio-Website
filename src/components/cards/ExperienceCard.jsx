import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import styled from "styled-components";

// Style components
const Top = styled.div`
  width: 100%;
  display: flex;
  max-width: 100%;
  gap: 12px;
`;

const Image = styled.img`
  height: 50px;
  border-radius: 10px;
  margin-top: 4px;
  transition: transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.1);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  }

  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Role = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => `rgb(255, 255, 255)`};
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${({ theme }) => `rgb(255, 165, 0)`};
    transform: translateX(5px);
  }

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Company = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => `rgb(200, 200, 200)`};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => `rgb(0, 255, 255)`};
  }

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => `rgb(150, 150, 150)`};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => `rgb(255, 255, 255)`};
  }

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => `rgb(255, 255, 255)`};
  margin-bottom: 10px;
  transition: color 0.3s ease, opacity 0.3s ease;

  &:hover {
    color: ${({ theme }) => `rgb(255, 99, 71)`};
    opacity: 0.8;
  }

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Skills = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  margin-top: -10px;
`;

const Span = styled.div`
  display: -webkit-box;
  max-width: 100%;
`;

const Skill = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => `rgb(255, 255, 255)`};
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${({ theme }) => `rgb(0, 255, 0)`};
    transform: scale(1.1);
  }

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

// Add RGB Border effect and animations
const RGBBorderEffect = styled.div`
  position: relative;
  display: inline-block;
  padding: 12px;
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: border 0.3s ease, transform 0.3s ease-in-out;

  /* RGB Border Effect */
  &:hover {
    border: 2px solid rgb(255, 0, 0);
    animation: rgbGlow 1.5s linear infinite;
    transform: scale(1.05); /* Zoom effect */
  }

  @keyframes rgbGlow {
    0% {
      border-color: rgb(255, 0, 0);
    }
    33% {
      border-color: rgb(0, 255, 0);
    }
    66% {
      border-color: rgb(0, 0, 255);
    }
    100% {
      border-color: rgb(255, 0, 0);
    }
  }

  /* Lightning Glow Effect */
  &:hover {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 0, 0, 0.8);
  }

  /* Text Glow Effect */
  &:hover ${Description} {
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 0, 0, 0.8);
  }

  /* Pulse Effect */
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  &:hover {
    animation: pulse 1s infinite;
    transition: transform 0.3s ease;
  }

  /* Flipping Card Effect */
  & {
    perspective: 1000px;
  }

  &:hover {
    transform: rotateY(10deg);
    transition: transform 0.6s ease-in-out;
  }
`;

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={experience?.company}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            transition: "transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease",
          }}
          src={experience?.img}
        />
      }
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "rgb(17, 25, 40)",
        color: "#fff",
        boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        backgroundColor: "rgba(17, 25, 40, 0.83)",
        border: "1px solid rgba(255, 255, 255, 0.125)",
        borderRadius: "6px",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(255, 255, 255, 0.3)",
      }}
      date={experience?.date}
    >
      <RGBBorderEffect>
        <Top>
          <Image src={experience?.img} />
          <Body>
            <Role>{experience?.role}</Role>
            <Company>{experience?.company}</Company>
            <Date>{experience?.date}</Date>
          </Body>
        </Top>
        <Description>
          {experience?.desc && <Span>{experience.desc}</Span>}
          {experience?.skills && (
            <>
              <br />
              <Skills>
                <b>Skills</b>
                <ItemWrapper>
                  {experience?.skills?.map((skill, index) => (
                    <Skill key={index}>• {skill}</Skill>
                  ))}
                </ItemWrapper>
              </Skills>
            </>
          )}
        </Description>
      </RGBBorderEffect>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
