import React, { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "../styles/Button.css";
import videoSource from "../assets/video/efeitoPortal.mp4";
import { useSpring, animated } from 'react-spring';

function Loading2({ updateButtonClicked }) {
  const [isHovered, setIsHovered] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [videoVisible, setVideoVisible] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [animationComplete, setAnimationComplete] = useState(false);
  const [containerVisible, setContainerVisible] = useState(true); // Estado para controlar a visibilidade do contêiner

  const override = `
    display: block;
    border-color: red;
    margin: auto;
  `;

  let containerStyle = {
    position: "relative",
    display: containerVisible ? "flex" : "none", // Usando o estado para controlar a visibilidade
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  const buttonContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
  };

  const buttonStyle = {
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    transition: "transform 0.3s ease, background 0.5s ease-out, box-shadow 0.5s ease-out",
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleButtonClick = () => {
    updateButtonClicked(true);
    setButtonClicked(true);
  };

  useEffect(() => {
    if (buttonClicked) {
      document.body.style.overflow = "hidden"; // Adiciona overflow hidden para evitar a barra de rolagem
    }
    return () => {
      document.body.style.overflow = "visible"; // Restaura o overflow quando o componente for desmontado
    };
  }, [buttonClicked]);

  const handleVideoEnd = () => {
    setVideoVisible(false);
  };

  useEffect(() => {
    if (buttonClicked && !videoVisible) {
      setContainerVisible(false); // Atualize o estado para ocultar o contêiner quando o vídeo não estiver mais visível
    }
  }, [buttonClicked, videoVisible]);

  const exitAnimation = useSpring({
    opacity: buttonClicked ? 0 : 1,
    config: { duration: 500 },
    onRest: () => {
      setAnimationComplete(true);
    },
  });

  return (
    <div className="sweet-loading" style={containerStyle}>
      {buttonClicked && videoVisible && (
        <video
          autoPlay
          muted
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
          onEnded={handleVideoEnd}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {!setAnimationComplete || !buttonClicked ? (
        <>
          <animated.div style={{ ...exitAnimation }}>
            <div translate="no" className="button-container" style={buttonContainerStyle}>
              <button
                className="button"
                onClick={handleButtonClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={buttonStyle}
              >
                SELECT
              </button>
            </div>
            <PuffLoader
              color={color}
              loading={true}
              css={override}
              size={250}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </animated.div>
        </>
      ) : null}
    </div>
  );
}

export default Loading2;

