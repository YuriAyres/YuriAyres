import React, { useState, useRef} from 'react';
import github from '../assets/icons/github-original.svg';
import html from '../assets/icons/html5-original.svg';
import css from '../assets/icons/css3-original.svg';
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





const Skills = ({ overlayOffset, swipeLeftRef }) => {
    const [activeButton, setActiveButton] = useState('frontend');
    const secondRef = useRef(null);
    const thirdRef = useRef(null);
    const fourthRef = useRef(null);
    const fifthRef = useRef(null);
    const sixthRef = useRef(null);


    const handleClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    return (
        <div
            ref={swipeLeftRef}
            className="habilidades-overlay"
            style={{
                transform: `translateX(${overlayOffset}px)`,
                transition: 'transform 0.3s ease',
            }}
        >

            <img src={elipse} alt="" className="elipse-2" />
            <div className="flex-overlay">
                <div className="habilidades-mobile-div">
                    <section className="habilidades-mobile">
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
                </div>
                <section className="habilidades-card-background-mobile">
                    <TransitionGroup component={null}>
                        {activeButton === 'frontend' && (
                            <CSSTransition
                                key="frontend"
                                timeout={500}
                                classNames="fade"
                                nodeRef={secondRef}
                            >
                                <section ref={secondRef} className={`habilidades-card-mobile ${activeButton === 'frontend' ? 'habilidades-card-mobile-active' : ''}`}>
                                    <div className="habilidades-div-mobile">
                                        <img src={html} alt="" className="icon-size-mobile" />
                                        <h3>HTML</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={css} alt="" className="icon-size-mobile" />
                                        <h3>CSS</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={js} alt="" className="icon-size-mobile" />
                                        <h3>Javascript</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={react} alt="" className="icon-size-mobile" />
                                        <h3>React</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={node} alt="" className="icon-size-mobile" />
                                        <h3>NodeJS</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={vite} alt="" className="icon-size-mobile" />
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
                                nodeRef={thirdRef}
                            >
                                <section ref={thirdRef} className={`habilidades-card-mobile ${activeButton === 'backend' ? 'habilidades-card-mobile-active' : ''}`}>
                                    <div className="habilidades-div-mobile">
                                        <img src={python} alt="" className="icon-size-mobile" />
                                        <h3>Python</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={flask} alt="" className="icon-size-mobile" />
                                        <h3>Flask</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={fast} alt="" className="icon-size-mobile" />
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
                                nodeRef={fourthRef}
                            >
                                <section ref={fourthRef} className={`habilidades-card-mobile ${activeButton === 'banco' ? 'habilidades-card-mobile-active' : ''}`}>
                                    <div className="habilidades-div-mobile">
                                        <img src={postgre} alt="" className="icon-size-mobile" />
                                        <h3>PostgreSQL</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={sqla} alt="" className="icon-size-mobile" />
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
                                nodeRef={fifthRef}
                            >
                                <section ref={fifthRef} className={`habilidades-card-mobile ${activeButton === 'devops' ? 'habilidades-card-mobile-active' : ''}`}>
                                    <div className="habilidades-div-mobile">
                                        <img src={aws} alt="" className="icon-size-mobile" />
                                        <h3>Amazon Web Services</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={apache} alt="" className="icon-size-mobile" />
                                        <h3>Apache</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={arduino} alt="" className="icon-size-mobile" />
                                        <h3>Arduino</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={rasp} alt="" className="icon-size-mobile" />
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
                                nodeRef={sixthRef}
                            >
                                <section ref={sixthRef} className={`habilidades-card-mobile ${activeButton === 'toolset' ? 'habilidades-card-mobile-active' : ''}`}>
                                    <div className="habilidades-div-mobile">
                                        <img src={git} alt="" className="icon-size-mobile" />
                                        <h3>Git</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={github} alt="" className="icon-size-mobile" />
                                        <h3>GitHub</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={post} alt="" className="icon-size-mobile" />
                                        <h3>Postman</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={vs} alt="" className="icon-size-mobile" />
                                        <h3>VSCode</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={vbox} alt="" className="icon-size-mobile" />
                                        <h3>Virtual Box</h3>
                                    </div>
                                    <div className="habilidades-div-mobile">
                                        <img src={ubuntu} alt="" className="icon-size-mobile" />
                                        <h3>Ubuntu</h3>
                                    </div>
                                </section>
                            </CSSTransition>
                        )}


                    </TransitionGroup>
                </section>
            </div>
        </div>
    );
};

export default Skills;
