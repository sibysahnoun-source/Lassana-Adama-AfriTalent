
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
  document.addEventListener("DOMContentLoaded", () => {
    initFreelanceFilters();
    initContactValidation();
});

function initFreelanceFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const freelanceCards = document.querySelectorAll(".freelance-card");

    if (!filterButtons.length || !freelanceCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const currentActive = document.querySelector(".filter-btn.active");
            if (currentActive) currentActive.classList.remove("active");
            button.classList.add("active");

            const targetCategory = button.getAttribute("data-category");

            freelanceCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");

                if (targetCategory === "all" || targetCategory === cardCategory) {
                    card.style.display = "block";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                        card.style.transition = "all 0.4s ease";
                    }, 10);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    card.style.display = "none";
                }
            });
        });
    });
}

function initContactValidation() {
    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", (event) => {
        let isFormValid = true;

        const nom = document.getElementById("nom");
        const email = document.getElementById("email");
        const sujet = document.getElementById("sujet");
        const message = document.getElementById("message");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        resetFormErrors();

        if (!nom.value.trim()) {
            setFieldError(nom, "Le nom et le prénom sont obligatoires.");
            isFormValid = false;
        }

        if (!email.value.trim()) {
            setFieldError(email, "L'adresse email est obligatoire.");
            isFormValid = false;
        } else if (!emailPattern.test(email.value.trim())) {
            setFieldError(email, "Veuillez entrer un format d'email valide (ex: nom@email.com).");
            isFormValid = false;
        }

        if (!sujet.value) {
            setFieldError(sujet, "Veuillez sélectionner l'objet de votre message.");
            isFormValid = false;
        }

        if (message.value.trim().length < 20) {
            setFieldError(message, "Votre message est trop court (20 caractères minimum requis).");
            isFormValid = false;
        }

        if (!isFormValid) {
            event.preventDefault();
        } else {
            alert("Félicitations ! Votre message a été validé et envoyé avec succès.");
        }
    });
}

function setFieldError(inputElement, message) {
    inputElement.classList.add("is-invalid");
    const errorSpan = document.getElementById(`${inputElement.id}-error`);
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = "block";
    }
}

function resetFormErrors() {
    document.querySelectorAll(".error-message").forEach(span => {
        span.textContent = "";
        span.style.display = "none";
    });
    document.querySelectorAll("input, textarea, select").forEach(input => {
        input.classList.remove("is-invalid");
    });
}