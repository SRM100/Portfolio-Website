import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Bio } from "../data/constants";
import { MenuRounded } from "@mui/icons-material";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;

  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const theme = useTheme();
  const [currentSection, setCurrentSection] = useState('About'); // Track current section

  // Function to handle section change
  const handleSectionChange = (section) => {
    setCurrentSection(section);
    const hoverAudio = document.getElementById("hover-audio");
    const vangelisAudio = document.getElementById("vangelis-audio");

    // Play hover audio for all sections except About
    if (section !== 'About') {
      hoverAudio.play();
    }

    // Play Vangelis audio for specific sections
    if (section === 'Projects' || section === 'Certificates') {
      vangelisAudio.play();
    }
  };

  // Function to start audio playback after user interaction
  const startAudioPlayback = () => {
    const backgroundAudio = document.getElementById("background-audio");

    // Play background audio on loop
    backgroundAudio.play();
    backgroundAudio.loop = true;

    // Hide the button after starting the audio
    setIsAudioStarted(true);
  };

  // Function to play bell audio when GitHub button is clicked
  const playBellAudio = () => {
    const bellAudio = document.getElementById("bell-audio");
    bellAudio.play();
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">Portfolio</NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavItems>
          <NavLink onClick={() => handleSectionChange('About')} href="#About">About</NavLink>
          <NavLink onClick={() => handleSectionChange('Skills')} href="#Skills">Skills</NavLink>
          <NavLink onClick={() => handleSectionChange('Experience')} href="#Experience">Experience</NavLink>
          <NavLink onClick={() => handleSectionChange('Projects')} href="#Projects">Projects</NavLink>
          <NavLink onClick={() => handleSectionChange('Certificates')} href="#Certificates">Certificates</NavLink>
          <NavLink onClick={() => handleSectionChange('Education')} href="#Education">Education</NavLink>
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <NavLink onClick={() => handleSectionChange('About')} href="#About">About</NavLink>
            <NavLink onClick={() => handleSectionChange('Skills')} href="#Skills">Skills</NavLink>
            <NavLink onClick={() => handleSectionChange('Experience')} href="#Experience">Experience</NavLink>
            <NavLink onClick={() => handleSectionChange('Projects')} href="#Projects">Projects</NavLink>
            <NavLink onClick={() => handleSectionChange('Certificates')} href="#Certificates">Certificates</NavLink>
            <NavLink onClick={() => handleSectionChange('Education')} href="#Education">Education</NavLink>
            
            <GithubButton
              href={Bio.github}
              target="_Blank"
              onClick={playBellAudio}
              style={{
                background: theme.primary,
                color: theme.text_primary,
              }}
            >
              Github Profile
            </GithubButton>
          </MobileMenu>
        )}

        <ButtonContainer>
          <GithubButton href={Bio.github} target="_Blank" onClick={playBellAudio}>
            Github Profile
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>

      {/* Button to start audio playback */}
      {!isAudioStarted && (
        <button onClick={startAudioPlayback}>Start Audio</button>
      )}

      {/* Audio Elements */}
      <audio id="hover-audio" src="/audio/hover1.mp3" />
      <audio id="vangelis-audio" src="/audio/Vangelis.mp3" />
      <audio id="background-audio" src="/audio/background.mp3" loop />
      <audio id="bell-audio" src="/audio/bell2.mp3" />
    </Nav>
  );
};

export default Navbar;