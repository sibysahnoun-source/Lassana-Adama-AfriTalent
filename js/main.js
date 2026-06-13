/* ========================================
   AFRITALENT — main.js
   Auteur : Lassana Adama
   ======================================== */

// On attend que toute la page soit chargée avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function () {

  /* ========================================
     1. DARK MODE / LIGHT MODE
     ======================================== */

  // On récupère le bouton dark mode et le body
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const iconeDarkMode = darkModeToggle.querySelector('i');

  // Fonction pour activer le mode sombre
  function activerDarkMode() {
    body.classList.add('dark-mode');
    // On change l'icône lune -> soleil
    iconeDarkMode.classList.remove('bi-moon');
    iconeDarkMode.classList.add('bi-sun');
    // On sauvegarde le choix dans le navigateur
    localStorage.setItem('theme', 'dark');
  }

  // Fonction pour activer le mode clair
  function activerLightMode() {
    body.classList.remove('dark-mode');
    // On change l'icône soleil -> lune
    iconeDarkMode.classList.remove('bi-sun');
    iconeDarkMode.classList.add('bi-moon');
    // On sauvegarde le choix dans le navigateur
    localStorage.setItem('theme', 'light');
  }

  // Au chargement de la page, on vérifie si un thème est déjà enregistré
  const themeSauvegarde = localStorage.getItem('theme');

  if (themeSauvegarde === 'dark') {
    activerDarkMode();
  } else {
    activerLightMode();
  }

  // Quand on clique sur le bouton, on bascule le thème
  darkModeToggle.addEventListener('click', function () {
    // Si le mode sombre est actif, on repasse en clair, sinon on passe en sombre
    if (body.classList.contains('dark-mode')) {
      activerLightMode();
    } else {
      activerDarkMode();
    }
  });


  /* ========================================
     2. NAVBAR DYNAMIQUE AU SCROLL
     ======================================== */

  const navbar = document.getElementById('navbar');

  // Cette fonction s'exécute chaque fois que l'utilisateur fait défiler la page
  window.addEventListener('scroll', function () {
    // Si on a scrollé de plus de 50px vers le bas
    if (window.scrollY > 50) {
      // On ajoute la classe "scrolled" -> navbar avec fond blanc et ombre
      navbar.classList.add('scrolled');
    } else {
      // Sinon on enlève la classe -> navbar transparente
      navbar.classList.remove('scrolled');
    }
  });


  /* ========================================
     3. BOUTON "RETOUR EN HAUT"
     ======================================== */

  const backToTopButton = document.getElementById('backToTop');

  // On affiche/cache le bouton selon la position du scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      // Si on a scrollé plus de 300px, on affiche le bouton
      backToTopButton.style.display = 'block';
    } else {
      // Sinon on le cache
      backToTopButton.style.display = 'none';
    }
  });

  // Quand on clique sur le bouton, on remonte en haut en douceur
  backToTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Effet de défilement fluide
    });
  });


  /* ========================================
     4. ANNEE DYNAMIQUE DANS LE FOOTER
     ======================================== */

  const anneeSpan = document.getElementById('annee');
  if (anneeSpan) {
    anneeSpan.textContent = new Date().getFullYear();
  }

}); // Fin du DOMContentLoaded