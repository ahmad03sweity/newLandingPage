document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navbar = document.getElementById("navbar");
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".navbar__menu");
  const header = document.querySelector(".page__header");
  const footer = document.querySelector("footer");

  // Build the navigation bar dynamically by iterating through each section
  function buildNav() {
    sections.forEach((section) => {
      const sectionId = section.id;
      const sectionTitle = section.getAttribute("data-nav");

      const li = document.createElement("li");
      li.insertAdjacentHTML(
        "afterbegin",
        `<a href="#${sectionId}" class="menu__link">${sectionTitle}</a>`
      );
      navbar.appendChild(li);

      scrollBehavior(li, section); // Add smooth scrolling to the navigation link
    });
  }

  // Implement smooth scrolling when navigation links are clicked
  function scrollBehavior(navButton, section) {
    navButton.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    });
  }

  // Highlight the active section and corresponding navigation link
  function activeSection() {
    const navLinks = document.querySelectorAll(".menu__link");
    sections.forEach((section, i) => {
      const sectionRect = section.getBoundingClientRect();
      if (sectionRect.top <= 380 && sectionRect.bottom >= 350) {
        section.classList.add("your-active-class");
        navLinks[i].classList.add("active_button");
      } else {
        section.classList.remove("your-active-class");
        navLinks[i].classList.remove("active_button");
      }
    });
  }

  // Hide the navigation bar when the user is not scrolling
  function toggleNavBar() {
    let userScroll;
    header.style.cssText = "opacity: 1; transition: ease 0.3s;";
    window.clearTimeout(userScroll);
    userScroll = setTimeout(() => {
      header.style.cssText = "opacity: 0; transition: ease 0.3s;";
    }, 6000);
  }

  // Add a scroll-to-top button and handle its click event
  footer.insertAdjacentHTML("beforebegin", `<div id="return_top"></div>`);
  document.getElementById("return_top").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Initialize the navigation bar and add event listeners for scroll events
  buildNav();
  window.addEventListener("scroll", () => {
    activeSection();
    toggleNavBar();
  });

  // Handle hamburger menu toggle for mobile responsiveness
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      if (menu) {
        menu.classList.toggle("show");
      }
    });
  }
});
