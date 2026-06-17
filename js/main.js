
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


  const compteurs = document.querySelectorAll('.counter');

  function animerCompteur(element) {

    const cible = parseInt(element.getAttribute('data-target'));
    let valeurActuelle = 0;


    const increment = cible / 100;

    function mettreAJour() {
      valeurActuelle += increment;

      if (valeurActuelle < cible) {

        element.textContent = Math.ceil(valeurActuelle);
      
        requestAnimationFrame(mettreAJour);
      } else {
        element.textContent = cible;
      }
    }

    mettreAJour();
  }

  const observerCompteurs = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        animerCompteur(entree.target);
      
        observerCompteurs.unobserve(entree.target);
      }
    });
  }, {
    threshold: 0.5 
  });

  compteurs.forEach(function (compteur) {
    observerCompteurs.observe(compteur);
  });


  const elementsFadeIn = document.querySelectorAll('.fade-in');

  const observerFadeIn = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        entree.target.classList.add('visible');
        observerFadeIn.unobserve(entree.target);
      }
    });
  }, {
    threshold: 0.2 
  });

  elementsFadeIn.forEach(function (element) {
    observerFadeIn.observe(element);
  })

  const boutonsFiltre = document.querySelectorAll('.btn-filter');
  const cartesFreelance = document.querySelectorAll('.freelance-card');

  if (boutonsFiltre.length > 0) {

    boutonsFiltre.forEach(function (bouton) {
      bouton.addEventListener('click', function () {

        
        boutonsFiltre.forEach(function (b) {
          b.classList.remove('active');
        });

      
        this.classList.add('active');

      
        const categorieChoisie = this.getAttribute('data-categorie');

        
        cartesFreelance.forEach(function (carte) {
          const categorieFreelance = carte.getAttribute('data-categorie');

          if (categorieChoisie === 'tous') {
            
            carte.style.display = 'block';
          } else if (categorieFreelance === categorieChoisie) {
        
            carte.style.display = 'block';
          } else {
          
            carte.style.display = 'none';
          }
        });
      });
    });
  }


  const formulaire = document.getElementById('contactForm');

  if (formulaire) {

    function afficherErreur(idErreur, message) {
      const erreur = document.getElementById(idErreur);
      if (erreur) {
        erreur.textContent = message;
      }
    }

    
    function effacerErreur(idErreur) {
      const erreur = document.getElementById(idErreur);
      if (erreur) {
        erreur.textContent = '';
      }
    }

  
    function champValide(champ) {
      champ.classList.remove('is-invalid');
      champ.classList.add('is-valid');
    }

    
    function champInvalide(champ) {
      champ.classList.remove('is-valid');
      champ.classList.add('is-invalid');
    }

  
    formulaire.addEventListener('submit', function (e) {
    
      e.preventDefault();

      
      const nom = document.getElementById('nom');
      const prenom = document.getElementById('prenom');
      const email = document.getElementById('email');
      const sujet = document.getElementById('sujet');
      const message = document.getElementById('message');
      const successMessage = document.getElementById('success-message');

      
      let estValide = true;

    
      if (nom.value.trim() === '') {
        afficherErreur('error-nom', 'Le nom est obligatoire.');
        champInvalide(nom);
        estValide = false;
      } else {
        effacerErreur('error-nom');
        champValide(nom);
      }

      
      if (prenom.value.trim() === '') {
        afficherErreur('error-prenom', 'Le prénom est obligatoire.');
        champInvalide(prenom);
        estValide = false;
      } else {
        effacerErreur('error-prenom');
        champValide(prenom);
      }

      
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value.trim() === '') {
        afficherErreur('error-email', 'L\'email est obligatoire.');
        champInvalide(email);
        estValide = false;
      } else if (!regexEmail.test(email.value.trim())) {
        afficherErreur('error-email', 'Format d\'email invalide (ex: nom@email.com).');
        champInvalide(email);
        estValide = false;
      } else {
        effacerErreur('error-email');
        champValide(email);
      }

    
      if (sujet.value === '') {
        afficherErreur('error-sujet', 'Veuillez choisir un sujet.');
        champInvalide(sujet);
        estValide = false;
      } else {
        effacerErreur('error-sujet');
        champValide(sujet);
      }

    
      if (message.value.trim() === '') {
        afficherErreur('error-message', 'Le message est obligatoire.');
        champInvalide(message);
        estValide = false;
      } else if (message.value.trim().length < 20) {
        afficherErreur('error-message', 
          'Le message doit contenir au moins 20 caractères. ' +
          '(Actuel : ' + message.value.trim().length + ' caractères)');
        champInvalide(message);
        estValide = false;
      } else {
        effacerErreur('error-message');
        champValide(message);
      }

      
      if (estValide) {
      
        formulaire.style.display = 'none';
      
        successMessage.style.display = 'block';
    
        formulaire.reset();
      }
    });
  }