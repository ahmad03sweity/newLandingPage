document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navbar = document.getElementById('navbar');

    // Loop through each section and create corresponding <li> in the navigation
    sections.forEach(section => {
        const sectionId = section.id;
        const sectionTitle = section.getAttribute('data-nav');
        
        // Create the <li> element
        const li = document.createElement('li');
        
        // Create an <a> element to link to the section
        const a = document.createElement('a');
        a.href = `#${sectionId}`;
        a.textContent = sectionTitle;
        
        // Add a class for styling active state in navigation
        a.classList.add('menu__link');

        // Append the <a> inside the <li>
        li.appendChild(a);

        // Append the <li> to the <ul> (navbar)
        navbar.appendChild(li);
    });

    // Function to highlight the active section and corresponding navbar link
    function setActiveSection() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Check if the section is in the viewport
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.id;
            }
        });

        // Highlight the corresponding navbar link for the active section
        const navLinks = document.querySelectorAll('.menu__link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });

        // Add or remove the 'your-active-class' from sections
        sections.forEach(section => {
            section.classList.remove('your-active-class');
            if (section.id === currentSection) {
                section.classList.add('your-active-class');
            }
        });
    }

    // Event listener for scrolling to update the active section and navbar link
    window.addEventListener('scroll', setActiveSection);

    // Function to scroll to the section when a link is clicked
    const navLinks = document.querySelectorAll('.menu__link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Initial call to set the active section when the page loads
    setActiveSection();
});
