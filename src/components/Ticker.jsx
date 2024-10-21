import React, { useEffect } from 'react';
import $ from 'jquery';
import 'lettering.js';

function Ticker({ text }) {
  useEffect(() => {
    const elem = $('.word');

    if (elem.length  && text) {
      // Divide o texto em spans para cada letra
      elem.lettering(); 
      // Define o aria-label com o texto original
      elem.attr('aria-label', text); 

      const ticker = new TickerClass(elem, text);
      ticker.reset();
    }

    return () => {};
  }, [text]); // Adicionei [text] aqui para reinicializar se o texto mudar

  return <div className="word">{text}</div>;
}


function TickerClass(elem, fixedText) {
  this.done = false;
  this.cycleCount = 5;
  this.cycleCurrent = 0;
  this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./~'.split('');
  this.charsCount = this.chars.length;
  this.letters = elem.find('span');
  this.letterCount = this.letters.length;
  this.letterCurrent = 0;

  

  // Salva o texto fixo em cada letra
  this.letters.each((index, span) => {
    const $span = $(span);
    $span.attr('data-orig', fixedText[index] || ''); // Salva cada caractere do texto fixo
    $span.text(fixedText[index]); // Define o texto fixo no span
  });
}

TickerClass.prototype.getChar = function () {
  return this.chars[Math.floor(Math.random() * this.charsCount)];
};

TickerClass.prototype.reset = function () {
  this.done = false;
  this.cycleCurrent = 0;
  this.letterCurrent = 0;

  // Restaura o texto original antes de iniciar o loop
  this.letters.each(function () {
    const $this = $(this);
    $this.text($this.attr('data-orig')); // Restaura o texto original
    $this.removeClass('done');
  });

  this.loop();
};

TickerClass.prototype.loop = function () {
  const self = this;

  this.letters.each(function (index, elem) {
    const $elem = $(elem);
    if (index >= self.letterCurrent) {
      if ($elem.text() !== ' ') {
        $elem.text(self.getChar()); // Define um caractere aleatório temporário
        $elem.css('opacity', Math.random()); // Varia a opacidade para o efeito visual
      }
    }
  });

  if (this.cycleCurrent < this.cycleCount) {
    this.cycleCurrent++;
  } else if (this.letterCurrent < this.letterCount) {
    const currLetter = this.letters.eq(this.letterCurrent);
    this.cycleCurrent = 0;
    currLetter.text(currLetter.attr('data-orig')).css('opacity', 1).addClass('done'); // Exibe o texto correto
    this.letterCurrent++;
  } else {
    this.done = true;
  }

  if (!this.done) {
    requestAnimationFrame(function () {
      self.loop();
    });
  } else {
    setTimeout(function () {
      self.reset();
    }, 750);
  }
}

export default Ticker;