import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import {
  Instagram,
  LinkedIn,
  Twitter,
  GitHub
} from "@mui/icons-material";

const lightning = keyframes`
  0% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 1);
  }
  100% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.5);
  }
`;

const rgbEffect = keyframes`
  0% { color: red; }
  33% { color: green; }
  66% { color: blue; }
  100% { color: red; }
`;

const zoomEffect = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  position: relative;
  background-color: ${({ theme }) => theme.footer_background};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.div`
  font-weight: 600;
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
  animation: ${lightning} 2s infinite;
`;

const Nav = styled.ul`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    text-align: center;
    font-size: 12px;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.2s ease-in-out;
  &:hover {
    animation: ${rgbEffect} 1s infinite;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialMediaIcon = styled.a`
  display: inline-block;
  margin: 0 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s ease-in-out;
  &:hover {
    animation: ${rgbEffect} 1s infinite, ${zoomEffect} 0.5s forwards;
  }
`;

const StyledInstagram = styled(Instagram)`
  &:hover {
    animation: ${zoomEffect} 0.5s forwards;
  }
`;

const StyledLinkedIn = styled(LinkedIn)`
  &:hover {
    animation: ${zoomEffect} 0.5s forwards;
  }
`;

const StyledTwitter = styled(Twitter)`
  &:hover {
    animation: ${zoomEffect} 0.5s forwards;
  }
`;

const StyledGitHub = styled(GitHub)`
  &:hover {
    animation: ${zoomEffect} 0.5s forwards;
  }
`;

const Copyright = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.soft2};
  text-align: center;
`;

const Footer = () => {
  useEffect(() => {
    const handleUserInteraction = () => {
      const audioElement = document.getElementById("myAudio");
      if (audioElement) {
        audioElement.play().catch(error => {
          console.error("Failed to play audio:", error);
        });
      }
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>Shashwat Mishra</Logo>
        <Nav>
          <NavLink href="#About">About</NavLink>
          <NavLink href="#Skills">Skills</NavLink>
          <NavLink href="#Experience">Experience</NavLink>
          <NavLink href="#Projects">Projects</NavLink>
          <NavLink href="#Certificates">Certificates</NavLink>
          <NavLink href="#Education">Education</NavLink>
        </Nav>
        <SocialMediaIcons>
          <SocialMediaIcon href={Bio.twitter} target="_blank" rel="noopener noreferrer">
            <StyledTwitter />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.linkedin} target="_blank" rel="noopener noreferrer">
            <StyledLinkedIn />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.insta} target="_blank" rel="noopener noreferrer">
            <StyledInstagram />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.github} target="_blank" rel="noopener noreferrer">
            <StyledGitHub />
          </SocialMediaIcon>
        </SocialMediaIcons>
        <audio id="myAudio" src="path/to/your/audio/file.mp3"></audio>
        <Copyright>&copy; 2024 Shashwat Mishra. All rights reserved.</Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;