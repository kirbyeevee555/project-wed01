'use  strict';

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const togglerNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", togglerNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

const header = document.querySelector("[data-header]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY
}

addEventOnElem(window, "scroll", headerSticky);

const section = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < section.length; i++) {
    if (section[i].getBoundingClientRect().top < window.innerHeight / 2) {
      section[i].classList.add("active");
    } else {
      section[i].classList.remove("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

let targetScroll = window.scrollY;
let currentScroll = window.scrollY;
let smoothScrolling = false;

window.addEventListener("wheel", function (event) {
  event.preventDefault();

  targetScroll += event.deltaY;
  targetScroll = Math.max(0, targetScroll);
  const maxScroll = this.document.documentElement.scrollHeight - this.window.innerHeight;

  targetScroll = Math.min(targetScroll, maxScroll);

  if (!smoothScrolling) {
    smoothScroll();
  }
}, { passive: false });

function smoothScroll() {
  smoothScrolling = true;
  currentScroll += (targetScroll - currentScroll) * 0.08;
  window.scrollTo(0, currentScroll);

  if (Math.abs(targetScroll - currentScroll) > 0.5) {
    requestAnimationFrame(smoothScroll);
  } else {
    currentScroll = targetScroll;
    window.scrollTo(0, currentScroll);
    smoothScrolling = false;
  }
}

const shippingBar = document.querySelector(".alert");
window.addEventListener("scroll", () => {
  if (!shippingBar) return;

  shippingBar.style.transform =
    `translateY(${window.scrollY * 0.15}px)`;
});

const heroSlides = document.querySelectorAll(".hero-slide");

let heroIndex = 0;

setInterval(() => {

  heroSlides[heroIndex].style.display = "none";

  heroIndex++;

  if (heroIndex >= heroSlides.length) {
    heroIndex = 0;
  }

  heroSlides[heroIndex].style.display = "block";

}, 4000);