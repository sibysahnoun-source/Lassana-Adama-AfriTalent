
document.addEventListener('DOMContentLoaded', function () {


  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const iconeDarkMode = darkModeToggle.querySelector('i');


  function activerDarkMode() {
    body.classList.add('dark-mode');
  
    iconeDarkMode.classList.remove('bi-moon');
    iconeDarkMode.classList.add('bi-sun');
  
    localStorage.setItem('theme', 'dark');
  }


  function activerLightMode() {
    body.classList.remove('dark-mode');
  
    iconeDarkMode.classList.remove('bi-sun');
    iconeDarkMode.classList.add('bi-moon');
  
    localStorage.setItem('theme', 'light');
  }


  const themeSauvegarde = localStorage.getItem('theme');

  if (themeSauvegarde === 'dark') {
    activerDarkMode();
  } else {
    activerLightMode();
  }


  darkModeToggle.addEventListener('click', function () {
  
    if (body.classList.contains('dark-mode')) {
      activerLightMode();
    } else {
      activerDarkMode();
    }
  });



  const navbar = document.getElementById('navbar');


  window.addEventListener('scroll', function () {
  
    if (window.scrollY > 50) {
  
      navbar.classList.add('scrolled');
    } else {
    
      navbar.classList.remove('scrolled');
    }
  });




  const backToTopButton = document.getElementById('backToTop');


  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
    
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });


  backToTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });




  const anneeSpan = document.getElementById('annee');
  if (anneeSpan) {
    anneeSpan.textContent = new Date().getFullYear();
  }

}); 
/* ========================================
     5. COMPTEURS ANIMÉS AU SCROLL
     ======================================== */

  // On récupère tous les éléments qui ont la classe "counter"
  const compteurs = document.querySelectorAll('.counter');

  // Fonction qui anime un compteur de 0 jusqu'à sa valeur cible
  function animerCompteur(element) {
    // On récupère la valeur cible depuis l'attribut data-target
    const cible = parseInt(element.getAttribute('data-target'));
    let valeurActuelle = 0;

    // On calcule l'incrément pour que l'animation dure environ 2 secondes
    const increment = cible / 100;

    function mettreAJour() {
      valeurActuelle += increment;

      if (valeurActuelle < cible) {
        // On affiche la valeur arrondie
        element.textContent = Math.ceil(valeurActuelle);
        // On répète l'animation à la prochaine frame
        requestAnimationFrame(mettreAJour);
      } else {
        // On affiche la valeur finale exacte
        element.textContent = cible;
      }
    }

    mettreAJour();
  }

  // IntersectionObserver : détecte quand un élément entre dans l'écran
  const observerCompteurs = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      // Si l'élément est visible à l'écran
      if (entree.isIntersecting) {
        animerCompteur(entree.target);
        // On arrête d'observer cet élément (l'animation ne se joue qu'une fois)
        observerCompteurs.unobserve(entree.target);
      }
    });
  }, {
    threshold: 0.5 // L'animation se déclenche quand 50% de l'élément est visible
  });

  // On observe chaque compteur
  compteurs.forEach(function (compteur) {
    observerCompteurs.observe(compteur);
  });


  /* ========================================
     6. ANIMATION FADE-IN AU SCROLL
     ======================================== */

  // On récupère toutes les sections qui doivent apparaître en fondu
  const elementsFadeIn = document.querySelectorAll('.fade-in');

  // IntersectionObserver pour le fade-in
  const observerFadeIn = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        // On ajoute la classe "visible" qui déclenche la transition CSS
        entree.target.classList.add('visible');
        // On arrête d'observer (l'animation ne se joue qu'une fois)
        observerFadeIn.unobserve(entree.target);
      }
    });
  }, {
    threshold: 0.2 // Se déclenche quand 20% de l'élément est visible
  });

  // On observe chaque élément
  elementsFadeIn.forEach(function (element) {
    observerFadeIn.observe(element);
  });