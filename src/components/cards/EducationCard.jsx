import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import styled from "styled-components";

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
  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const School = styled.div`
  font-size: 18px;
  font-weight: 600px;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Degree = styled.div`
  font-size: 14px;
  font-weight: 500px;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400px;
  color: ${({ theme }) => theme.text_secondary + 80};

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  margin-bottom: 10px;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Grade = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Span = styled.div`
  display: -webkit-box;
  max-width: 100%;
`;

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

const EducationCard = ({ education }) => {
  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={education?.school}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          src={education?.img}
        />
      }
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "#1d1836",
        color: "#fff",
        boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        backgroundColor: "rgba(17, 25, 40, 0.83)",
        border: "1px solid rgba(255, 255, 255, 0.125)",
        borderRadius: "6px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(255, 255, 255, 0.3)",
      }}
      date={education?.date}
    >
      <RGBBorderEffect>
        <Top>
          <Image src={education?.img} />
          <Body>
            <School>{education?.school}</School>
            <Degree>{education?.degree}</Degree>
            <Date>{education?.date}</Date>
          </Body>
        </Top>
        <Grade>
          <b>Grade : </b>
          {education?.grade}
        </Grade>
        <Description>
          {education?.desc && <Span>{education.desc}</Span>}
        </Description>
      </RGBBorderEffect>
    </VerticalTimelineElement>
  );
};

export default EducationCard;
