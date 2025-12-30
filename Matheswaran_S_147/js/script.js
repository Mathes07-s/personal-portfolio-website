// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Project Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");
        
        const filterValue = button.getAttribute("data-filter");
        
        projectCards.forEach(card => {
            if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                card.style.display = "block";
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, 100);
            } else {
                card.style.opacity = "0";
                card.style.transform = "translateY(20px)";
                setTimeout(() => {
                    card.style.display = "none";
                }, 300);
            }
        });
    });
});

// Contact Form Validation
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");
const formSuccess = document.getElementById("formSuccess");

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(input, errorElement, message) {
    input.style.borderColor = "#e74c3c";
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

function clearError(input, errorElement) {
    input.style.borderColor = "#ddd";
    errorElement.textContent = "";
    errorElement.style.display = "none";
}

nameInput.addEventListener("input", () => {
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, nameError, "Name must be at least 2 characters");
    } else {
        clearError(nameInput, nameError);
    }
});

emailInput.addEventListener("input", () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, "Please enter a valid email address");
    } else {
        clearError(emailInput, emailError);
    }
});

subjectInput.addEventListener("input", () => {
    if (subjectInput.value.trim().length < 3) {
        showError(subjectInput, subjectError, "Subject must be at least 3 characters");
    } else {
        clearError(subjectInput, subjectError);
    }
});

messageInput.addEventListener("input", () => {
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, messageError, "Message must be at least 10 characters");
    } else {
        clearError(messageInput, messageError);
    }
});

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate all fields
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, nameError, "Name must be at least 2 characters");
        isValid = false;
    }
    
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, "Please enter a valid email address");
        isValid = false;
    }
    
    if (subjectInput.value.trim().length < 3) {
        showError(subjectInput, subjectError, "Subject must be at least 3 characters");
        isValid = false;
    }
    
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, messageError, "Message must be at least 10 characters");
        isValid = false;
    }
    
    if (isValid) {
        // In a real application, you would send the form data to a server here
        // For this demo, we'll just show a success message
        contactForm.reset();
        formSuccess.style.display = "flex";
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.style.display = "none";
        }, 5000);
    }
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .hobby-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animation
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .hobby-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation once
    setTimeout(animateOnScroll, 300);
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);