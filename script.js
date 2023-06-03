// Navigation toggle visibility when clicked

const app = (() => {
  let body;
  let menu;
  
  const init = () => {
    body = document.querySelector('body');
    menu = document.querySelector('.menu-icon');

    applyListeners();
  }
  
  const applyListeners = () => {
    menu.addEventListener('click', () => toggleClass(body, 'nav-active'));
  }
  
  const toggleClass = (element, stringClass) => {
    if(element.classList.contains(stringClass))
      element.classList.remove(stringClass);
    else
      element.classList.add(stringClass);
  }
  
  init();
})();

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

  let scrollPosition = window.pageYOffset;

  if (scrollPosition > previousScrollPosition) {
    goingDown = true;
  }

  previousScrollPosition = scrollPosition;

  return goingDown;
};

// When page is scrolled down and nav not active toggles current page animation to scrolled and updates current pathname to next page.  Resets previousScrollPosition back to 0.


const handleScroll = () => {
  if (document.body.classList.contains("nav-active")) {
    return;
  }

  if (isScrollingDown()) {
    switch (window.location.pathname) {
      case "/Users/leahboalich/Documents/GitHub/Portfolio/index.html":
        scrollToggle("index-scroll");
        setTimeout(() => {
          window.location.pathname = "/Users/leahboalich/Documents/GitHub/Portfolio/about.html";
        }, 4800);
        break;
      case "/Users/leahboalich/Documents/GitHub/Portfolio/about.html":
        scrollToggle("about-scroll");
        setTimeout(() => {
          window.location.pathname = "/Users/leahboalich/Documents/GitHub/Portfolio/projects.html";
        }, 2000)
        break;
      case "/Users/leahboalich/Documents/GitHub/Portfolio/projects.html":
        window.location.pathname = "/Users/leahboalich/Documents/GitHub/Portfolio/contact.html";
        break;
      case "/Users/leahboalich/Documents/GitHub/Portfolio/contact.html":
        window.location.pathname = "/Users/leahboalich/Documents/GitHub/Portfolio/index.html";
        break;
      default:
        break;
    };
    previousScrollPosition = 0;
  }
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

// When page scrolled calls handle scroll only once per second

window.addEventListener("scroll", () => {
throttle(handleScroll, 1000);
});

// Toggle the visible project when the forward or back button is clicked

const displayToggle = (id) => {
  const element = document.getElementById(id);
  const elementClassList = element.classList;
  
  if (elementClassList.contains("project-visible")) {
    element.classList.replace("project-visible", "project-hidden")
  } else {
    element.classList.replace("project-hidden", "project-visible")
  };
};

// Using currentProjectId variable if sessionStorage not available.

let currentProjectId = "bird";


const handleProjectBackClick = () => {
  switch (sessionStorage.getItem("currentProjectId")) {
    case "bird": 
      displayToggle("bird");
      displayToggle("gta");
      sessionStorage.setItem("currentProjectId", "gta");
      break;
    case "reddit":
      displayToggle("reddit");
      displayToggle("bird");
      sessionStorage.setItem("currentProjectId", "bird");
      break;
    case "gta":
      displayToggle("gta");
      displayToggle("reddit");
      sessionStorage.setItem("currentProjectId", "reddit");
      break;
  };
};

const handleProjectForwardClick = () => {
  switch (sessionStorage.getItem("currentProjectId")) {
    case "bird":
      displayToggle("bird");
      displayToggle("reddit");
      sessionStorage.setItem("currentProjectId", "reddit");
      break;
    case "reddit" :
      displayToggle("reddit");
      displayToggle("gta");
      sessionStorage.setItem("currentProjectId", "gta");
      break;
    case "gta":
      displayToggle("gta");
      displayToggle("bird");
      sessionStorage.setItem("currentProjectId", "bird");
      break;
  }
};

// Loads next project when forward or back button clicked

document.getElementById("project-forward-button").addEventListener("click", () => handleProjectForwardClick());
document.getElementById("project-back-button").addEventListener("click", () => handleProjectBackClick());

// Current project always starts with It's A Bird which is stored. Load project page based on session storage project id

window.onload = () => {
  const currentProjectSet = sessionStorage.getItem("currentProjectId");
  
  if (currentProjectSet) {
    displayToggle(currentProjectSet);
  } else {
    sessionStorage.setItem("currentProjectId", "bird");
    displayToggle("bird");
  }; 
};
