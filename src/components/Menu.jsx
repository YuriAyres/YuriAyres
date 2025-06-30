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

        setTimeout(() => {
          setTextIntroIsVisible(false);
        }, 7000);

        setTimeout(() => {
          setTextIntro2IsVisible(false);
        }, 8500);

      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [buttonClicked, api]);

  const [activeButton, setActiveButton] = useState('frontend');

  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const [repos, setRepos] = useState([]);

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
  const [showTitulo, setShowTitulo] = useState(true);
  const [TextIntroIsVisible, setTextIntroIsVisible] = useState(true);
  const [showTitulo2, setShowTitulo2] = useState(true);
  const [TextIntro2IsVisible, setTextIntro2IsVisible] = useState(true);

  function startHideAnimation() {
    if (TextIntroIsVisible === false) {

      setTimeout(() => {
        setShowTitulo(false);
      }, 500);
    }

    if (TextIntro2IsVisible === false) {

      setTimeout(() => {
        setShowTitulo2(false);
      }, 500);
    }
  }

  useEffect(() => {
    startHideAnimation();
  }, [TextIntroIsVisible, TextIntro2IsVisible]);

  const [overlayOffset, setOverlayOffset] = useState(window.innerWidth - 41);
  const swipeLeftRef = useRef(null);
  const elipseLargura = 41; // ajuste conforme o tamanho da elipse
  const initialOffsetRef = useRef(window.innerWidth - elipseLargura);
  const isDragging = useRef(false);
  const startX = useRef(0);


  const reposSliderRef = useRef(null);

  useEffect(() => {

    const el = swipeLeftRef.current;

    const handleTouchStart = (e) => {
      isDragging.current = true;
      startX.current = e.touches[0].clientX;
      initialOffsetRef.current = overlayOffset;
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current) return;

      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startX.current;
      let newOffset = initialOffsetRef.current + deltaX;

      // limita o movimento entre 0 e a borda direita da tela
      newOffset = Math.min(Math.max(newOffset, 0), window.innerWidth - elipseLargura);
      setOverlayOffset(newOffset);
    };

    const handleTouchEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const threshold = 100;

      if (overlayOffset < threshold) {
        setOverlayOffset(0); // abre completamente
      } else {
        setOverlayOffset(window.innerWidth - elipseLargura); // fecha (só mostra a elipse)
      }
    };

    el?.addEventListener('touchstart', handleTouchStart);
    el?.addEventListener('touchmove', handleTouchMove);
    el?.addEventListener('touchend', handleTouchEnd);

    return () => {
      el?.removeEventListener('touchstart', handleTouchStart);
      el?.removeEventListener('touchmove', handleTouchMove);
      el?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [overlayOffset]);

  useEffect(() => {
    const slider = reposSliderRef.current;
    if (!slider) return; // impede erro

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.classList.add('active');
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
    };
  }, [repos]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);


  const handleScroll = () => {
    const slider = reposSliderRef.current;
    if (!slider) return;

    const scrollLeft = slider.scrollLeft;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    // Só mostra a barra se houver conteúdo suficiente para rolagem
    const shouldShow = slider.scrollWidth > slider.clientWidth;
    setShowProgressBar(shouldShow);

    const progress = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * 100 : 0;
    setScrollProgress(progress);
  };



  return (
    <div translate="no" className="menu-container" style={{ display: buttonClicked ? 'block' : 'none' }}>
      <animated.div style={styles}>
        <div className="portfolio-pages">
          <div className="body-2">
            <Skills
              overlayOffset={overlayOffset}
              swipeLeftRef={swipeLeftRef}
            />

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
                      <h1 className="nome ">Yuri Ayres de Paula</h1>
                    </div>
                  </section>
                  <section className="titulo_pagina">
                    {showTitulo && (
                      <div className={`div-titulo ${TextIntroIsVisible ? "fade-in" : "fade-out"}`}>
                        <h2 className="titulo">
                          {splitTextIntoSpans("Seja bem-vindo!")}
                        </h2>
                        <div className="div-sub">
                          <h4 className="subtitulo">
                            {splitTextIntoSpans("Você pode avaliar minhas habilidades técnicas aqui")}
                          </h4>

                          <img src={flecha} alt="" className={`icon-flecha ${animateArrow ? 'animate-arrow' : ''}`} />

                        </div>
                      </div>
                    )}
                  </section>
                </div>
                <div className="projetos-div">
                  <section className="projetos-card">
                    {repos.length > 0 ? (
                      <>
                        <div className="repos-slider" ref={reposSliderRef} onScroll={handleScroll}>
                          {repos.map((repo) => (
                            <div key={repo.id} className="repo-card">
                              <img src={repo.image_url} alt={`${repo.name} thumbnail`} className="repo-image" />
                              <h3>{repo.name}</h3>
                              <p>{repo.description}</p>
                              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">Ver repositório</a>
                            </div>
                          ))}
                        </div>
                        {showProgressBar && (
                          <div className="div-progress-bar">
                            <div className="progress-bar-container">
                              <div
                                className="progress-bar"
                                style={{ width: `${scrollProgress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="card_carregando">
                        <Ticker text="Carregando..." />
                        <div className="overlay_div">
                          <div className="overlay"></div>
                        </div>
                      </div>
                    )}
                  </section>
                  {showTitulo2 && (
                    <div className={`div-sub-2 ${TextIntro2IsVisible ? "fade-in" : "fade-out"}`}>
                      <img src={flecha} alt="" className={`icon-flecha2 ${animateArrow2 ? 'animate-arrow-2' : ''}`} />
                      <h4 className="subtitulo">
                        {splitTextIntoSpans("Conheça um pouco mais sobre meus projetos")}
                      </h4>
                    </div>
                  )}
                </div>

              </div>
              <div className="div_habilidades">
                <section className="habilidades">
                  <div>
                    <button
                      className={activeButton === 'frontend' ? 'active' : ''}
                      onClick={() => handleClick('frontend')}
                    >
                      Frontend
                    </button>
                  </div>
                  <div>
                    <button
                      className={activeButton === 'backend' ? 'active' : ''}
                      onClick={() => handleClick('backend')}
                    >
                      Backend
                    </button>
                  </div>
                  <div>
                    <button
                      className={activeButton === 'banco' ? 'active' : ''}
                      onClick={() => handleClick('banco')}
                    >
                      Banco de Dados
                    </button>
                  </div>
                  <div>
                    <button
                      className={activeButton === 'devops' ? 'active' : ''}
                      onClick={() => handleClick('devops')}
                    >
                      DevOps &amp; Infra
                    </button>
                  </div>
                  <div>
                    <button
                      className={activeButton === 'toolset' ? 'active' : ''}
                      onClick={() => handleClick('toolset')}
                    >
                      Toolset
                    </button>
                  </div>
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
        </div>
      </animated.div>
    </div>
  );
}

export default Menu;




