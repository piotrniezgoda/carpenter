window.onload = function() {
const showHideButton = document.querySelector('.navbar__trigger');
const menu = document.querySelector('.header__navbar');
const body = document.querySelector('body');
let scrollpos = window.scrollY;

function showMenu() {
	menu.classList.add('header__navbar-slide');
	body.classList.add('body-slide');
  showHideButton.innerHTML = 'Zamknij menu';
  showHideButton.setAttribute('aria-expanded', 'true');
  menu.classList.remove('main-menu__items--hidden');
}
 
function hideMenu() {
	menu.classList.remove('header__navbar-slide');
	body.classList.remove('body-slide');
  showHideButton.setAttribute('aria-expanded', 'false');
  showHideButton.innerHTML = 'Otwórz menu';
  menu.classList.add('main-menu__items--hidden');
  showHideButton.blur();
}

function scrollSection() {
  let menuLinks = document.querySelectorAll('.navbar__link')
  let sections = document.querySelectorAll('.section');
   let sectionsOffset = [];
  for (let i=0; sections.length>i; i++) {
     sectionsOffset.push(sections[i].offsetTop);
    }

      for(let i=0; sectionsOffset.length>i; i++) {
          
          menuLinks[i].classList.remove('navbar__link--active');

         if(window.scrollY+150>=sectionsOffset[i]) {
          menuLinks[i].classList.add('navbar__link--active');
       }
      }
    
}

window.addEventListener('scroll', scrollSection)
//scrollSection();



 
showHideButton.addEventListener('click', function() {
  let menuLinks = document.querySelectorAll('.navbar__link');
	for(let i=0;  menuLinks.length>i; i++) {
		menuLinks[i].addEventListener('click', function() {
			hideMenu();
		})
	}
  if (menu.classList.contains('main-menu__items--hidden')) {
    showMenu();
  } else {
    hideMenu();
  }
}, hideMenu());

}

