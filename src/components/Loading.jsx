import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from '../styles/Loading.module.css';
import logo from '../assets/img/forma.png';
import '../styles/Txt_animado.css';



function Loading({ buttonClicked }) {
  const [progress, setProgress] = useState(100);
  const [animationComplete, setAnimationComplete] = useState(false);


  useEffect(() => {
    if (!buttonClicked) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1;
          } else {
            clearInterval(interval);
            return prevProgress;
          }
        });
      }, 20);

      return () => clearInterval(interval);
    }
  }, [buttonClicked]);

  const imagePulse = useSpring({
    from: { transform: 'scale(1)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'scale(1.2)' });
        await next({ transform: 'scale(1)' });
      }
    },
    config: { duration: 1000 },
  });

  const exitAnimation = useSpring({
    opacity: buttonClicked ? 0 : 1,
    config: { duration: 500 },
    onRest: () => {
      setAnimationComplete(true);
    },
  });


  return (
    <div className={styles.container} style={{ display: (!animationComplete) ? 'block' : 'none' }}>
      <animated.div style={{ ...exitAnimation }} className="texto-animado intro">
        <span></span>
      </animated.div>
      <animated.img
        src={logo}
        alt=""
        className={`${styles.form} ${styles.pulsating}`}
        style={{ ...imagePulse, ...exitAnimation }}
      />
    </div>
  );
}

export default Loading;