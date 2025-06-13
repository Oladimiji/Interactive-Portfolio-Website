document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
    });

    // Contact Form Validation
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            formStatus.textContent = "Please fill in all fields.";
            formStatus.style.color = "red";
        } else {
            formStatus.textContent = "Message sent successfully!";
            formStatus.style.color = "green";
            contactForm.reset();
        }
    });
});
