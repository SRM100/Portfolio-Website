import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 330px;
  height: 450px;
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

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
    animation: pulse 1s infinite;
  }

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
    transform: rotateY(10deg);
    transition: transform 0.6s ease-in-out;
  }

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

  &:hover {
    box-shadow: 0 0 16px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 0, 0, 0.8);
  }
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

  &:hover {
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 0, 0, 0.8);
  }
`;

const Button = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  margin-top: auto;

  &:hover {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 0, 0, 0.8);
  }
`;

const CertificateCard = ({ certificate }) => {
  return (
    <Card>
      <Image src={certificate.image} />
      <Details>
        <Title>{certificate.title}</Title>
      </Details>
      <Button href={certificate.link} target="_blank">
        View Certificate
      </Button>
    </Card>
  );
};

export default CertificateCard;