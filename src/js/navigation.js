
const showHideButton = document.querySelector('.navbar__trigger');
const plusSizebtn = document.querySelector('#largeText');
const minusSizebtn = document.querySelector('#smallText');
const menu = document.querySelector('.header__navbar');
const body = document.querySelector('body');
let scrollpos = window.scrollY;
var width = window.innerWidth 
|| document.documentElement.clientWidth 
|| document.body.clientWidth;

function showMenu() {
  let menuLinks = document.querySelectorAll('.navbar__link');
  let logo = document.querySelector('.navlogo__link');
  logo.removeAttribute("tabIndex", "-1");
  for (let i=0; menuLinks.length>i; i++) {
    menuLinks[i].removeAttribute("tabIndex", "-1");
  }
	menu.classList.add('header__navbar-slide');
	body.classList.add('body-slide');
  showHideButton.innerHTML = 'Zamknij menu';
  showHideButton.setAttribute('aria-expanded', 'true');
  menu.classList.remove('main-menu__items--hidden');
}
 
function addClassHidden() {
  if(width<768) {
    menu.classList.add('main-menu__items--hidden');
  }
  
}

function hideMenu() {
  let menuLinks = document.querySelectorAll('.navbar__link')
  let logo = document.querySelector('.navlogo__link');
  logo.setAttribute("tabIndex", "-1");
  for (let i=0; menuLinks.length>i; i++) {
    menuLinks[i].setAttribute("tabIndex", "-1");
  }
	menu.classList.remove('header__navbar-slide');
	body.classList.remove('body-slide');
  showHideButton.setAttribute('aria-expanded', 'false');
  showHideButton.innerHTML = 'Otwórz menu';
  menu.classList.add('main-menu__items--hidden');
  showHideButton.blur();
}

/*
=====================                             ===========================
===================== add class active for current section in navigation   ===========================
*/

function scrollSection() {
  let menuLinks = document.querySelectorAll('.navbar__link')
  let sections = document.querySelectorAll('.section');
   let sectionsOffset = [];
  for (let i=0; sections.length>i; i++) {
     sectionsOffset.push(sections[i].offsetTop);
    }

      for(let i=0; sectionsOffset.length>i; i++) {
          
          menuLinks[i].classList.remove('navbar__link--active');

          if(window.scrollY+70>=sectionsOffset[i]) {
          menuLinks[i].classList.add('navbar__link--active');
       }
      }
}


//scroll section initiate/
document.addEventListener('scroll', scrollSection);

/*
=====================                             ===========================
===================== magnify the text function   ===========================
*/

function plusSizeText() {
  plusSizebtn.disabled = true;
  minusSizebtn.disabled = false;
  let html = document.querySelector('html');
  html.classList.add('text2x');
}

function minusSizeText() {
  plusSizebtn.disabled = false;
  minusSizebtn.disabled = true;
  let html = document.querySelector('html');
  html.classList.remove('text2x');
}

function startTextSize() {
  minusSizebtn.disabled = true;
}

plusSizebtn.addEventListener('click', function() {
  plusSizeText()
})

minusSizebtn.addEventListener('click', function() {
  minusSizeText();
})



/*
=====================                             ===========================
===================== listener for open mobile nav   ===========================
*/
 
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
},addClassHidden(), startTextSize());


