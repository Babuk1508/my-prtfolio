document.addEventListener("DOMContentLoaded", function () {
    function activateSection(sectionName) {
        var sections = document.querySelectorAll("[data-section]");
        sections.forEach(function (sec) {
            if (!sectionName) {
                sec.classList.remove("active");
                return;
            }
            sec.classList.toggle("active", sec.getAttribute("data-section") === sectionName);
        });
    }

    // Smooth scroll for internal links that switch sections
    document.querySelectorAll('a[data-section-link][href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            var targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            var target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();

            var sectionName = this.getAttribute("data-section-link");
            if (sectionName) {
                activateSection(sectionName);
            }

            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // Clicking the name/logo returns to hero and hides sections
    var homeLink = document.getElementById("homeLink");
    if (homeLink) {
        homeLink.addEventListener("click", function (event) {
            event.preventDefault();
            activateSection(null); // hide all About/Skills/Experience/Projects/Contact
            var hero = document.getElementById("top");
            if (hero) {
                hero.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    // Contact form handler (front-end only)
    var contactForm = document.getElementById("contactForm");
    var status = document.getElementById("formStatus");

    if (contactForm && status) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var name = document.getElementById("name").value.trim();
            var email = document.getElementById("contactEmail").value.trim();
            var message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                status.textContent = "Please fill in all fields.";
                status.classList.remove("success");
                status.classList.add("error");
                return;
            }

            status.textContent = "Thank you, " + name + ". This demo form shows how a message would be sent.";
            status.classList.remove("error");
            status.classList.add("success");

            contactForm.reset();
        });
    }

    // Footer year
    var yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

