// Selecione os links de navegação e adicione ouvintes de evento
var meusLinks = document.querySelectorAll("li");

meusLinks.forEach(function(li) {
  li.addEventListener("click", onCliqueiNoLink);
});

// Função para lidar com o clique nos links de navegação
function onCliqueiNoLink() {
  // Remova a classe "active" de todos os links de navegação
  meusLinks.forEach(function(li) {
    li.classList.remove("active");
  });

  // Adicione a classe "active" ao link de navegação clicado
  this.classList.add("active");

  // Se o link clicado for a página "Home", remova a classe "header-top"
  if (this.id === "home") {
    document.querySelector("header").classList.remove("header-top");
  } else {
    document.querySelector("header").classList.add("header-top");
  }

  // Atualize a seção a ser exibida com base no link clicado
  selectSection(this.id);
}

// Função para exibir a seção correspondente ao link clicado
function selectSection(sectionId) {
  var sections = document.querySelectorAll("section");

  sections.forEach(function(section) {
    section.classList.remove("section-show");
  });

  var targetSection = document.getElementById(sectionId);

  if (targetSection) {
    targetSection.classList.add("section-show");
  }
}

// Adicione ouvintes de evento para os links de navegação que ativam as seções
meusLinks.forEach(function(link) {
  link.addEventListener("click", function() {
    selectSection(link.firstChild.getAttribute("href").substring(1));
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var menuIcon = document.querySelector('.menu-icon');
  var mobileNav = document.querySelector('.mobile-nav');

  menuIcon.addEventListener('click', function () {
    // Adiciona a classe 'visible' ao elemento .mobile-nav
    mobileNav.classList.toggle('visible');
  });

  // Adiciona ouvinte de evento para os links de navegação na versão móvel
  var mobileNavLinks = document.querySelectorAll('.mobile-nav a');

  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Fecha a navegação móvel após clicar em um link
      mobileNav.classList.remove('visible');
    });
  });
});

