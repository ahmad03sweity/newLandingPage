document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navbar = document.getElementById("navbar");
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".navbar__menu");

  // Dynamically create navigation links
  sections.forEach((section) => {
    const sectionId = section.id;
    const sectionTitle = section.getAttribute("data-nav");

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${sectionId}`;
    a.textContent = sectionTitle;
    a.classList.add("menu__link");
    li.appendChild(a);
    navbar.appendChild(li);
  });

  const navLinks = document.querySelectorAll(".menu__link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) { // Ensure targetSection exists
        // Calculate the offset position
        const offset = 50; // Adjust this value to match your navbar height
        const sectionPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
        
        // Smoothly scroll to the adjusted position
        window.scrollTo({
          top: sectionPosition,
          behavior: "smooth",
        });

        // Close menu on link click
        if (menu && menu.classList.contains("show")) {
          menu.classList.remove("show");
        }
      }
    });
  });

  // Function to highlight active section and navbar link
  function setActiveSection() {
    let currentSection = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const offset = 50; // Adjust to match your navbar height
      if (
        rect.top >= -section.clientHeight / 2 - offset &&
        rect.top < window.innerHeight / 2 - offset
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("active");
      }
    });

    sections.forEach((section) => {
      section.classList.remove("your-active-class");
      if (section.id === currentSection) {
        section.classList.add("your-active-class");
      }
    });
  }

  // Scroll event listener using requestAnimationFrame
  window.addEventListener("scroll", () => {
    requestAnimationFrame(setActiveSection);
  });

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      if (menu) {
        menu.classList.toggle("show");
      }
    });
  }

  // Set active section on page load
  setActiveSection();
});
