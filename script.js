// Navigation toggle visibility when clicked

const app = (() => {
  let body;
  let menu;
  let navItems = [];
  
  const init = () => {
    body = document.querySelector('body');
    menu = document.querySelector('.menu-icon');
    navItems = document.getElementsByClassName("nav__list-item");

    applyListeners();
  };
  
  const applyListeners = () => {
    menu.addEventListener('click', () => toggleClass(body, 'nav-active'));

    for (i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener("click", () => toggleClass(body, "nav-active"));
    };
  };
  
  const toggleClass = (element, stringClass) => {
    if(element.classList.contains(stringClass))
      element.classList.remove(stringClass);
    else
      element.classList.add(stringClass);
  };
  
  init();
})();

// Delays page load when nav list item clicked

function delay (URL) {
  setTimeout( function() { window.location = URL }, 800 );
}

// Toggles page load and exit animations

const scrollToggle = (className) => {
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.toggle("start");
    elements[i].classList.toggle("scrolled")
  };
};

// Index page always loads first with scroll position of 0

let previousScrollPosition = 0;

// Determine if page was scrolled down and set previousScrollPosition to new scroll position

const isScrollingDown = () => {
  let goingDown = false;

  let scrollPosition = window.scrollY;

  if (scrollPosition > previousScrollPosition) {
    goingDown = true;
  }

  previousScrollPosition = scrollPosition;

  return goingDown;
};

// Returns the current page.  

const getCurrentPage = () => {
  let currentPage;

  switch (window.location.pathname) {
    case "/portfolio/":
      currentPage = "index";
      break;
    case "/portfolio/about.html":
      currentPage = "about";
      break;
    case "/portfolio/projects.html":
      currentPage = "projects";
      break;
  };

  return currentPage;
};

// When page is scrolled down and nav not active toggles current page animation to scrolled and updates current pathname to next page.  Resets previousScrollPosition back to 0. 

const handleScroll = () => {
  if (document.body.classList.contains("nav-active")) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    previousScrollPosition = 0;
    return;
  }

  if (isScrollingDown()) {

// Return screen to top so content still in center of page for exit animations.
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 250); 

    setTimeout(() => {
      switch (getCurrentPage()) {
        case "index":
          scrollToggle("index-scroll");
          setTimeout(() => {
            previousScrollPosition = 0;
          }, 4800);
          setTimeout(() => {
            window.location.pathname = "/portfolio/about.html";
          }, 5800);
          break;

        case "about":
          scrollToggle("about-scroll");
          setTimeout(() => {
            previousScrollPosition = 0;
          }, 2000);
          setTimeout(() => {
            window.location.pathname = "/portfolio/projects.html";
          }, 3000);
          break;

        case "projects":
          scrollToggle("projects-scroll");
          setTimeout(() => {
            previousScrollPosition = 0;
          }, 2000)
          setTimeout(() => {
            window.location.pathname = "/portfolio/";
          }, 3000);
          break;

        default:
          break;
      };   
    }, 500);
  };
};

// Makes sure event can only fire function after certain amount of time has elapsed.

let throttleTimer;
const throttle = (callback, time) => {
  if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);
};

// When page scrolled calls handle scroll only once per second. 

window.addEventListener("scroll", () => {
  throttle(handleScroll, 1000);
});
