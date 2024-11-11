import React, { useState } from "react";
import { MenuRounded } from "@mui/icons-material";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import "@google/model-viewer";

const lightTheme = {
  bg: "#ffffff",
  text_primary: "#000000",
  primary: "#6200ea",
  card_light: "#f5f5f5",
};

const darkTheme = {
  bg: "#000000",
  text_primary: "#ffffff",
  primary: "#bb86fc",
  card_light: "#333333",
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

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
  color: ${({ theme }) => theme.text_primary};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;
  animation: lightning 2s infinite;

  @keyframes lightning {
    0%, 100% {
      box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5);
    }
    50% {
      box-shadow: 0 0 20px 10px rgba(255, 255, 255, 1);
    }
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  position: relative;
`;

const ModelViewerWrapper = styled.div`
  width: 240px;
  height: 240px;
  margin-left: 20px;
  flex-shrink: 0;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2); /* Slight light-up effect */
  }

  @media screen and (max-width: 1024px) {
    width: 200px;
    height: 200px;
  }

  @media screen and (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0;
  list-style: none;
  flex-grow: 1;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  padding: 8px 16px;
  transition: all 0.3s ease;
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.text_primary};
    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.8); /* Glow effect */
    animation: rgbGlowing 1s ease-in-out infinite;
  }

  @keyframes rgbGlowing {
    0% {
      box-shadow: 0 0 10px 5px rgba(255, 0, 0, 0.5);
    }
    25% {
      box-shadow: 0 0 10px 5px rgba(0, 255, 0, 0.5);
    }
    50% {
      box-shadow: 0 0 10px 5px rgba(0, 0, 255, 0.5);
    }
    75% {
      box-shadow: 0 0 10px 5px rgba(255, 255, 0, 0.5);
    }
    100% {
      box-shadow: 0 0 10px 5px rgba(255, 0, 255, 0.5);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  &:hover:before {
    opacity: 1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 6px;

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const GithubButton = styled.button`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: ${({ theme }) => theme.bg};

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    animation: rgbGlowing 1s ease-in-out infinite;
  }

  /* Change the color of the button */
  background-color: #ff6347; /* Tomato color */
  color: white;

  &:hover {
    background-color: #ff4500; /* OrangeRed color */
    color: white;
  }
`;

const ThemeToggleButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  @media screen and (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`;

const MobileMenu = styled.ul`
  position: absolute;
  top: 80px;
  right: 0;
  width: 100%;
  padding: 12px 40px;
  background: ${({ theme }) => theme.card_light};
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-20px)")};
  transition: all 0.3s ease;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState('About');
  const [theme, setTheme] = useState('light');

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    const hoverAudio = document.getElementById("hover-audio");
    const hover2Audio = document.getElementById("hover2-audio");
    const vangelisAudio = document.getElementById("vangelis-audio");

    if (section !== 'About') {
      hoverAudio.play();
    }

    if (section === 'Projects' || section === 'Certificates') {
      vangelisAudio.play();
    }

    if (section === 'Skills' || section === 'Experience' || section === 'Projects' || section === 'Certificates' || section === 'Education' || section === 'Contact') {
      hover2Audio.play();
    }

    // Close the mobile menu
    setIsOpen(false);
  };

  const startAudioPlayback = () => {
    const backgroundAudio = document.getElementById("background-audio");
    backgroundAudio.play();
    backgroundAudio.loop = true;
    setIsAudioStarted(true);
  };

  const playBellAudio = () => {
    const bellAudio = document.getElementById("bell-audio");
    bellAudio.play();
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Nav>
        <NavbarContainer>
          <ModelViewerWrapper>
            <model-viewer
              src="models/desk.glb"
              camera-controls
              disable-pan
              disable-zoom
              interaction-prompt="none"
              min-camera-orbit="auto 55deg auto"
              max-camera-orbit="auto 92deg auto"
              field-of-view="35.3deg"
              style={{ width: "100%", height: "100%" }}
            />
          </ModelViewerWrapper>

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
            <NavLink onClick={() => handleSectionChange('Contact')} href="#Contact">Contact</NavLink>
          </NavItems>

          {isOpen && (
            <MobileMenu isOpen={isOpen}>
              <NavLink onClick={() => handleSectionChange('About')} href="#About">About</NavLink>
              <NavLink onClick={() => handleSectionChange('Skills')} href="#Skills">Skills</NavLink>
              <NavLink onClick={() => handleSectionChange('Experience')} href="#Experience">Experience</NavLink>
              <NavLink onClick={() => handleSectionChange('Projects')} href="#Projects">Projects</NavLink>
              <NavLink onClick={() => handleSectionChange('Certificates')} href="#Certificates">Certificates</NavLink>
              <NavLink onClick={() => handleSectionChange('Education')} href="#Education">Education</NavLink>
              <NavLink onClick={() => handleSectionChange('Contact')} href="#Contact">Contact</NavLink>
            </MobileMenu>
          )}

          <ButtonContainer>
            {!isAudioStarted && (
              <GithubButton
                onClick={startAudioPlayback}
                onMouseEnter={playBellAudio}
              >
                Start Audio
              </GithubButton>
            )}
            <ThemeToggleButton onClick={toggleTheme}>
              Switch to {theme === 'light' ? 'dark' : 'light'} theme
            </ThemeToggleButton>
          </ButtonContainer>
        </NavbarContainer>

        <audio id="background-audio" loop>
          <source src="/audio/background.mp3" type="audio/mpeg" />
          <source src="/audio/background.ogg" type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        <audio id="hover-audio">
          <source src="/audio/hover-sound.mp3" type="audio/mpeg" />
          <source src="/audio/hover-sound.ogg" type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        <audio id="hover2-audio">
          <source src="/audio/hover2.mp3" type="audio/mpeg" />
          <source src="/audio/hover2.ogg" type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        <audio id="vangelis-audio" loop>
          <source src="/audio/vangelis.mp3" type="audio/mpeg" />
          <source src="/audio/vangelis.ogg" type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        <audio id="bell-audio">
          <source src="/audio/bell2.mp3" type="audio/mpeg" />
          <source src="/audio/bell2.ogg" type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
      </Nav>
    </ThemeProvider>
  );
};

export default Navbar;
