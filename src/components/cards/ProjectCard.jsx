import React from "react";
import styled, { keyframes } from "styled-components";

// Define lightning animation
const lightningGlow = keyframes`
  0% {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(0, 255, 255, 0.5), 0 0 24px rgba(0, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 12px rgba(255, 255, 255, 1), 0 0 18px rgba(0, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.4);
  }
  100% {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(0, 255, 255, 0.5), 0 0 24px rgba(0, 255, 255, 0.3);
  }
`;

// Define pulse animation
const pulseEffect = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components
const FullCard = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.card || "#ffffff"};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  position: relative;

  &:hover {
    animation: ${lightningGlow} 0.3s ease-in-out infinite alternate, ${pulseEffect} 1.5s ease-in-out infinite;
    transform: translateY(-10px);
    box-shadow: 0 0 50px rgba(0, 255, 255, 0.6);
  }
`;

// Adding animation effects to the image
const FullImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    animation: ${pulseEffect} 1.5s ease-in-out infinite, ${lightningGlow} 0.5s ease-in-out infinite;
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.6);
  }
`;

const FullTags = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const FullDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FullTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text_secondary || "#333"};
`;

const FullDate = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary || "#666"};
`;

const FullDescription = styled.ul`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary || "#333"};
  line-height: 1.5;
  padding-left: 20px;
  list-style-type: disc;
`;

const FullButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
`;

const FullButton = styled.a`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  padding: 12px 0;
  border-radius: 6px;
  flex: 1;
  text-align: center;
  background-color: ${({ primary }) => (primary ? "#FF5733" : "#3498DB")};
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${({ primary }) => (primary ? "#e14f2a" : "#297fb1")};
    transform: scale(1.05);
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5);
  }
`;

const ProjectCard = ({ project }) => {
  return (
    <FullCard>
      <FullImage src={project.image} alt={`${project.title} image`} />
      <FullTags>
        {project.library?.map((tech, index) => (
          <span key={index}>{tech}</span>
        ))}
      </FullTags>
      <FullDetails>
        <FullTitle>{project.title}</FullTitle>
        <FullDate>{project.date}</FullDate>
        <FullDescription>
          {project.description.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </FullDescription>
      </FullDetails>
      <FullButtonGroup>
        {project.github && (
          <FullButton href={project.github} target="_blank" primary>
            View Code
          </FullButton>
        )}
        {project.webapp && (
          <FullButton href={project.webapp} target="_blank">
            View Demo
          </FullButton>
        )}
      </FullButtonGroup>
    </FullCard>
  );
};

export default ProjectCard;
