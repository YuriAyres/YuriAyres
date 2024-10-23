import "../styles/Menu.css";
import "../styles/Efeitos.css";
import React, { Component, useRef, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import foto_perfil from '../assets/img/foto_perfil.png';
import retangulo1 from '../assets/img/rectangle_1.png';
import github from '../assets/icons/github-original.svg';
import linkedin from '../assets/icons/linkedin-original.svg';
import html from '../assets/icons/html5-original.svg';
import css from '../assets/icons/css3-original.svg';
import flecha from '../assets/icons/navigate_next.svg';
import js from '../assets/icons/javascript-original.svg';
import react from '../assets/icons/react-original.svg';
import node from '../assets/icons/nodejs-original.svg';
import vite from '../assets/icons/vitejs-original.svg';
import python from '../assets/icons/python-original.svg';
import flask from '../assets/icons/flask-original.svg';
import fast from '../assets/icons/fastapi-original.svg';
import postgre from '../assets/icons/postgresql-original.svg';
import sqla from '../assets/icons/sqlalchemy-original.svg';
import aws from '../assets/icons/amazonwebservices-original-wordmark.svg';
import apache from '../assets/icons/apache-original.svg';
import arduino from '../assets/icons/arduino-original.svg';
import rasp from '../assets/icons/raspberrypi-original.svg';
import git from '../assets/icons/git-original.svg';
import post from '../assets/icons/postman-original.svg';
import vs from '../assets/icons/vscode-original.svg';
import vbox from '../assets/icons/virtualbox_logo.svg';
import ubuntu from '../assets/icons/ubuntu-original.svg';
import elipse from '../assets/img/elipse1.png';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { gsap } from 'gsap';
import Ticker from './Ticker';
import Skills from './Skills';


function Menu({ buttonClicked }) {
  const [styles, api] = useSpring(() => ({
    opacity: 0,
    config: { duration: 1000 },
  }));

  useEffect(() => {
    const delay = 4200;
    if (buttonClicked) {
      const timeoutId = setTimeout(() => {
        api.start({
          opacity: 1,
        });


        setTimeout(() => {
          animateText();
        }, 250);

        setTimeout(() => {
          setAnimateArrow(true);
        }, 3000);

        setTimeout(() => {
          setAnimateArrow2(true);
        }, 5000);

      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [buttonClicked, api]);

  const [activeButton, setActiveButton] = useState('frontend');

  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const [repos, setRepos] = useState([]);
  const [currentRepoIndex, setCurrentRepoIndex] = useState(0);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get('https://backend-portfolio-a6ap.onrender.com/api/repos');
        setRepos(response.data);
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
      }
    };

    fetchRepos();
  }, []);

  const [direction, setDirection] = useState('forward');

  const nextRepo = () => {
    setCurrentRepoIndex((prevIndex) =>
      prevIndex === repos.length - 1 ? 0 : prevIndex + 1
    );
    setDirection('forward');
  };

  const prevRepo = () => {
    setCurrentRepoIndex((prevIndex) =>
      prevIndex === 0 ? repos.length - 1 : prevIndex - 1
    );
    setDirection('backward');
  };

  const textRef = useRef(null);
  const range = 16;

  const updateShadow = (event) => {
    const x = Math.round((event.pageX * range) / window.innerWidth) - range / 2;
    const y = Math.round((event.pageY * range) / window.innerHeight) - range / 2;
    gsap.to(textRef.current, {
      '--x': x,
      '--y': y,
    });
  };
  useEffect(() => {
    document.body.addEventListener('mousemove', updateShadow);

    return () => {
      document.body.removeEventListener('mousemove', updateShadow);
    };
  }, []);

  const splitTextIntoSpans = (text) => {
    return text.split(' ').map((word, index) => (
      <span key={index} style={{ marginRight: '5px' }}>
        {word}
      </span>
    ));
  };

  const animateText = () => {
    const title = document.querySelector('.titulo');
    const subtitle = document.querySelector('.subtitulo');
    const spans = document.querySelectorAll('.titulo span, .subtitulo span');

    // Inicie a animação de escala nos elementos pai
    title.style.transform = 'scale(0.94)';
    title.style.animation = 'scale 3s forwards cubic-bezier(0.5, 1, 0.89, 1)';
    subtitle.style.transform = 'scale(0.94)';
    subtitle.style.animation = 'scale 3s forwards cubic-bezier(0.5, 1, 0.89, 1)';

    // Animação de fade-in para os spans
    spans.forEach((span, index) => {
      span.style.animation = `fade-in 1s ${index * 0.3}s forwards cubic-bezier(0.11, 0, 0.5, 0)`;
    });
  };

  const [animateArrow, setAnimateArrow] = useState(false);
  const [animateArrow2, setAnimateArrow2] = useState(false);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const openOverlay = () => {
    setIsOverlayOpen(true); // Abre o overlay
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false); // Fecha o overlay
  };

  const repoRef = useRef(null);
  


  return (
    <div translate="no" className="menu-container" style={{ display: buttonClicked ? 'block' : 'none' }}>
      <animated.div style={styles}>
        <div className="portfolio-pages">
          <div className="body-2">
            {isOverlayOpen && <Skills show={isOverlayOpen} onClose={closeOverlay} />}
            <div className="flex">
              <div className="flex-column">
                <div className="center">
                  <section className="perfil">
                    <img className="foto_perfil" src={foto_perfil} alt="" />
                    <div className="retangulo_redes_sociais">
                      <img className="retangulo_1" src={retangulo1} alt="" />
                      <div className="retangulo_redes_sociais_div">
                        <a href="https://github.com/YuriAyres"><img src={github} alt="" className="icon-perfil" /></a>
                        <a href="https://www.linkedin.com/in/yuriayres" target="_self"><img src={linkedin} alt="" className="icon-perfil" /></a>
                      </div>

                    </div>
                    <div id="text" ref={textRef} className="nome_div ">
                      <h1 className="nome ">Yuri Ayres</h1>
                      <h1 className="nome espaco ">de Paula</h1>
                    </div>
                  </section>
                  <section className="titulo_pagina">
                    <h2 className="titulo">
                      {splitTextIntoSpans("Seja bem-vindo!")}
                    </h2>
                    <div className="div-sub">
                      <h4 className="subtitulo">
                        {splitTextIntoSpans("Você pode avaliar minhas habilidades técnicas aqui")}
                      </h4>
                      <div className="overlay-mobile-elipse">
                        <img src={flecha} alt="" className={`icon-flecha ${animateArrow ? 'animate-arrow' : ''}`} />
                        <img src={elipse} alt="" className="elipse" onClick={openOverlay} />
                      </div>
                    </div>
                  </section>
                </div>
                <div className={`projetos-div ${isOverlayOpen ? 'projetos-div-null' : ''}`}>
                  <section className="projetos-card">
                    {repos.length > 0 ? (
                      <TransitionGroup>
                        <CSSTransition
                          key={repos[currentRepoIndex].id}
                          timeout={500}
                          classNames={direction === 'forward' ? 'repo-fade-forward' : 'repo-fade-backward'}
                        >
                          <div key={repos[currentRepoIndex].id} className="repo-card">
                            <img src={repos[currentRepoIndex].image_url} alt={`${repos[currentRepoIndex].name} thumbnail`} className="repo-image" />
                            <h3>{repos[currentRepoIndex].name}</h3>
                            <p>{repos[currentRepoIndex].description}</p>
                            <a href={repos[currentRepoIndex].html_url} target="_blank" rel="noopener noreferrer">Ver repositório</a>
                          </div>
                        </CSSTransition>
                      </TransitionGroup>
                    ) : (
                      <div className="card_carregando">
                        <Ticker text="Carregando..." />
                        <div className="overlay_div">
                          <div className="overlay"></div>
                        </div>
                      </div>
                    )}

                    <div className="repo-navigation">
                      <button className="repo-button" onClick={prevRepo}><img src={flecha} alt="" className="icon-flecha3" /></button>
                      <button className="repo-button" onClick={nextRepo}><img src={flecha} alt="" className="icon-flecha" /></button>
                    </div>
                  </section>
                  <div className="div-sub-2">
                    <img src={flecha} alt="" className={`icon-flecha2 ${animateArrow2 ? 'animate-arrow-2' : ''}`} />
                    <h4 className="subtitulo">
                      {splitTextIntoSpans("Conheça um pouco mais sobre meus projetos")}
                    </h4>
                  </div>
                </div>
              </div>
              <section className="habilidades">
                <button
                  className={activeButton === 'frontend' ? 'active' : ''}
                  onClick={() => handleClick('frontend')}
                >
                  Frontend
                </button>
                <button
                  className={activeButton === 'backend' ? 'active' : ''}
                  onClick={() => handleClick('backend')}
                >
                  Backend
                </button>
                <button
                  className={activeButton === 'banco' ? 'active' : ''}
                  onClick={() => handleClick('banco')}
                >
                  Banco de Dados
                </button>
                <button
                  className={activeButton === 'devops' ? 'active' : ''}
                  onClick={() => handleClick('devops')}
                >
                  DevOps &amp; Infra
                </button>
                <button
                  className={activeButton === 'toolset' ? 'active' : ''}
                  onClick={() => handleClick('toolset')}
                >
                  Toolset
                </button>
              </section>
              <section className="habilidades-card-background">
                <TransitionGroup component={null}>
                  {activeButton === 'frontend' && (
                    <CSSTransition
                      key="frontend"
                      timeout={500}
                      classNames="fade"
                    >
                      <section className={`habilidades-card ${activeButton === 'frontend' ? 'habilidades-card-active' : ''}`}>
                        <div className="habilidades-div">
                          <img src={html} alt="" className="icon-size" />
                          <h3>HTML</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={css} alt="" className="icon-size" />
                          <h3>CSS</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={js} alt="" className="icon-size" />
                          <h3>Javascript</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={react} alt="" className="icon-size" />
                          <h3>React</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={node} alt="" className="icon-size" />
                          <h3>NodeJS</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={vite} alt="" className="icon-size" />
                          <h3>Vite</h3>
                        </div>
                      </section>
                    </CSSTransition>
                  )}

                  {activeButton === 'backend' && (
                    <CSSTransition
                      key="backend"
                      timeout={500}
                      classNames="fade"
                    >
                      <section className={`habilidades-card ${activeButton === 'backend' ? 'habilidades-card-active' : ''}`}>
                        <div className="habilidades-div">
                          <img src={python} alt="" className="icon-size" />
                          <h3>Python</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={flask} alt="" className="icon-size" />
                          <h3>Flask</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={fast} alt="" className="icon-size" />
                          <h3>FastAPI</h3>
                        </div>
                      </section>
                    </CSSTransition>
                  )}

                  {activeButton === 'banco' && (
                    <CSSTransition
                      key="banco"
                      timeout={500}
                      classNames="fade"
                    >
                      <section className={`habilidades-card ${activeButton === 'banco' ? 'habilidades-card-active' : ''}`}>
                        <div className="habilidades-div">
                          <img src={postgre} alt="" className="icon-size" />
                          <h3>PostgreSQL</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={sqla} alt="" className="icon-size" />
                          <h3>SQLAlchemy</h3>
                        </div>
                      </section>
                    </CSSTransition>
                  )}

                  {activeButton === 'devops' && (
                    <CSSTransition
                      key="devops"
                      timeout={500}
                      classNames="fade"
                    >
                      <section className={`habilidades-card ${activeButton === 'devops' ? 'habilidades-card-active' : ''}`}>
                        <div className="habilidades-div">
                          <img src={aws} alt="" className="icon-size" />
                          <h3>Amazon Web Services</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={apache} alt="" className="icon-size" />
                          <h3>Apache</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={arduino} alt="" className="icon-size" />
                          <h3>Arduino</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={rasp} alt="" className="icon-size" />
                          <h3>Raspberry Pi</h3>
                        </div>
                      </section>
                    </CSSTransition>
                  )}

                  {activeButton === 'toolset' && (
                    <CSSTransition
                      key="toolset"
                      timeout={500}
                      classNames="fade"
                    >
                      <section className={`habilidades-card ${activeButton === 'toolset' ? 'habilidades-card-active' : ''}`}>
                        <div className="habilidades-div">
                          <img src={git} alt="" className="icon-size" />
                          <h3>Git</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={github} alt="" className="icon-size" />
                          <h3>GitHub</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={post} alt="" className="icon-size" />
                          <h3>Postman</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={vs} alt="" className="icon-size" />
                          <h3>VSCode</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={vbox} alt="" className="icon-size" />
                          <h3>Virtual Box</h3>
                        </div>
                        <div className="habilidades-div">
                          <img src={ubuntu} alt="" className="icon-size" />
                          <h3>Ubuntu</h3>
                        </div>
                      </section>
                    </CSSTransition>
                  )}


                </TransitionGroup>
              </section>
            </div>

          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default Menu;




