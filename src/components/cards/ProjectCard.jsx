import React from "react";
import styled from "styled-components";

// Style components
const Card = styled.div`
  width: 330px;
  height: 490px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;

  /* Apply pulse effect on hover */
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
    animation: pulse 1s infinite;
  }

  /* Pulse effect */
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

  /* Flipping card effect */
  &:hover {
    transform: rotateY(10deg);
    transition: transform 0.6s ease-in-out;
  }

  /* RGB border glow effect */
  &:hover {
    border: 2px solid rgb(255, 0, 0);
    animation: rgbGlow 1.5s linear infinite;
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

  /* Lightning glow effect */
  &:hover {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 0, 0, 0.8);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);

  /* Apply glowing effect on hover */
  &:hover {
    box-shadow: 0 0 16px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 0, 0, 0.8);
  }
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  transition: color 0.3s ease, transform 0.3s ease;

  /* Apply text glow effect on hover */
  &:hover {
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 0, 0, 0.8);
    transform: translateX(5px);
  }
`;

const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  overflow: hidden;
  margin-top: 8px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;

  /* Apply text glow effect on hover */
  &:hover {
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 0, 0, 0.8);
  }
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 3px solid ${({ theme }) => theme.card};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
`;

const Button = styled.a`
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: color 0.3s ease, text-shadow 0.3s ease, box-shadow 0.3s ease;
  flex: 1;
  padding: 8px 0;
  border-radius: 6px;
  ${({ primary }) => primary ? `
    background-color: #FF5733; /* Color for "View Code" */
  ` : `
    background-color: #3498DB; /* Color for "View Demo" */
  `}

  /* RGB border glow effect */
  &:hover {
    box-shadow: 0 0 10px rgb(255, 0, 0), 0 0 20px rgb(0, 255, 0), 0 0 30px rgb(0, 0, 255);
  }

  /* Lightning effect on hover */
  &:hover {
    text-shadow: 0 0 5px #fff, 0 0 10px ${({ primary }) => primary ? "#FF5733" : "#3498DB"};
    color: #fff;
  }
`;

const ProjectCard = ({ project }) => {
  return (
    <Card>
      <Image src={project.image} />
      <Tags></Tags>
      <Details>
        <Title>{project.title}</Title>
        <Date>{project.date}</Date>
        <Description>{project.description}</Description>
      </Details>
      <Members>
        {project.member?.map((member, index) => (
          <Avatar key={index} src={member.img} />
        ))}
      </Members>
      <ButtonGroup>
        {project.github && (
          <Button href={project.github} target="_blank" primary>
            View Code
          </Button>
        )}
        {project.webapp && (
          <Button href={project.webapp} target="_blank">
            View Demo
          </Button>
        )}
      </ButtonGroup>
    </Card>
  );
};

export default ProjectCard;
