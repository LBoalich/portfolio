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

let previousScrollPosition = 0;

const isScrollingDown = () => {
  let goingDown = false;

  let scrollPosition = window.pageYOffset;

  if (scrollPosition > previousScrollPosition) {
    goingDown = true;
  }

  previousScrollPosition = scrollPosition;

  return goingDown;
};


const handleScroll = () => {
  if (document.body.classList.contains("nav-active")) {
    return;
  }

  if (isScrollingDown()) {
    switch (window.location.pathname) {
      case "/Users/leahboalich/Documents/GitHub/Portfolio/index.html":
        window.location.pathname = "/Users/leahboalich/Documents/GitHub/Portfolio/about.html";
        break;
      case "/Users/leahboalich/Documents/GitHub/Portfolio/about.html":
        window.location.pathname = "/Users/leahboalich/Documents/GitHub/Portfolio/projects.html";
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

let throttleTimer;
const throttle = (callback, time) => {
  if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);
};

const scrollToggle = (className) => {
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.toggle("start");
    elements[i].classList.toggle("scrolled")
  };
};

// window.addEventListener("scroll", () => {
//  const element = document.getElementById("index-scrolled");
//  element.classList.toggle("")
// });


window.addEventListener("click", () => {scrollToggle("index-scroll"); console.log("scrolled");})

// window.addEventListener("scroll", () => {
//  throttle(handleScroll, 1000);
// });

