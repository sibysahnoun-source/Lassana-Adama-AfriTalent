
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