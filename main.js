document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");

    hamburger.addEventListener("click", function () {
        mobileNav.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
});

// Loading screen animation
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const loaderProgress = document.getElementById("loaderProgress");

    if (!loader || !loaderProgress) {
        console.error("Loader elements not found");
        return;
    }

    // Ensure loader is visible initially
    loader.style.display = "flex";
    loader.style.opacity = "1";

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);

            // Add hidden class for smooth transition
            loader.classList.add("hidden");

            // Remove loader after transition
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }
        loaderProgress.style.width = `${progress}%`;
    }, 200);
});

// LED Animation
const ledContainer = document.getElementById("ledAnimation");
const colors = ["#00f0ff", "#ff00f0", "#b400ff", "#ffffff"];

// Create initial LED dots
for (let i = 0; i < 80; i++) {
    createLEDDot();
}

function createLEDDot() {
    const dot = document.createElement("div");
    dot.className = "led-dot";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100 + 100}%`;
    const color = colors[Math.floor(Math.random() * colors.length)];
    dot.style.background = color;
    dot.style.color = color;
    dot.style.animationDelay = `${Math.random() * 10}s`;
    dot.style.animationDuration = `${5 + Math.random() * 10}s`;
    dot.style.width = `${4 + Math.random() * 4}px`;
    dot.style.height = dot.style.width;
    ledContainer.appendChild(dot);
}

// Mouse trail effect
document.addEventListener("mousemove", (e) => {
    const cursorDot = document.createElement("div");
    cursorDot.className = "led-dot";
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    const color = colors[Math.floor(Math.random() * colors.length)];
    cursorDot.style.background = color;
    cursorDot.style.color = color;
    cursorDot.style.opacity = "0.8";
    cursorDot.style.width = "8px";
    cursorDot.style.height = "8px";
    cursorDot.style.animation = "none";
    cursorDot.style.filter = "drop-shadow(0 0 8px currentColor)";
    ledContainer.appendChild(cursorDot);

    setTimeout(() => {
        cursorDot.style.transition = "all 0.5s";
        cursorDot.style.opacity = "0";
        cursorDot.style.transform = "scale(1.5)";
        setTimeout(() => {
            cursorDot.remove();
        }, 500);
    }, 50);
});

// Add random color rotation to card glows
document.querySelectorAll(".card-glow").forEach((glow) => {
    const colors = [
        "linear-gradient(45deg, #00f0ff, #ff00f0, #b400ff)",
        "linear-gradient(45deg, #ff00f0, #b400ff, #00f0ff)",
        "linear-gradient(45deg, #b400ff, #00f0ff, #ff00f0)",
    ];

    // Set initial random gradient
    glow.style.background = colors[Math.floor(Math.random() * colors.length)];

    // Add hover effect to parent card
    glow.parentElement.addEventListener("mouseenter", () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        glow.style.background = randomColor;
    });
});

// Smooth hover effects for all cards
document.querySelectorAll(".content-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
        card.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "";
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".content-section").forEach((section) => {
    observer.observe(section);
});

// Testimonial Slider
const testimonialSlider = {
    currentSlide: 0,
    slides: document.querySelectorAll(".content-card"),
    container: document.querySelector(".content-grid"),
    prevBtn: document.querySelector(".slider-nav.prev"),
    nextBtn: document.querySelector(".slider-nav.next"),
    isMobile: window.innerWidth <= 768,
    autoSlideInterval: null,

    init() {
        if (!this.container) return;

        // Set up event listeners
        this.prevBtn?.addEventListener("click", () => this.prevSlide());
        this.nextBtn?.addEventListener("click", () => this.nextSlide());

        // Handle window resize
        window.addEventListener("resize", () => {
            this.isMobile = window.innerWidth <= 768;
            this.updateSliderBehavior();
        });

        // Initial setup
        this.updateSliderBehavior();
    },

    updateSliderBehavior() {
        if (this.isMobile) {
            this.startAutoSlide();
            if (this.prevBtn) this.prevBtn.style.display = "none";
            if (this.nextBtn) this.nextBtn.style.display = "none";
        } else {
            this.stopAutoSlide();
            if (this.prevBtn) this.prevBtn.style.display = "flex";
            if (this.nextBtn) this.nextBtn.style.display = "flex";
        }
    },

    startAutoSlide() {
        if (this.autoSlideInterval) return;
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    },

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    },

    goToSlide(index) {
        if (!this.container || this.slides.length === 0) return;

        this.currentSlide = index;

        // Handle loop
        if (this.currentSlide >= this.slides.length) {
            this.currentSlide = 0;
        } else if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        }

        const offset = -this.currentSlide * 100;
        this.container.style.transform = `translateX(${offset}%)`;
    },

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    },

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    },
};

// Initialize the testimonial slider
document.addEventListener("DOMContentLoaded", () => {
    testimonialSlider.init();
});

// FAQ Accordion Functionality
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
            // Close all other items
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });

            // Toggle current item
            item.classList.toggle("active");
        });
    });

    // Optionally open first item by default
    // faqItems[0].classList.add('active');
});

// Interactive elements initialization
document.addEventListener("DOMContentLoaded", function () {
    // Newsletter form submission
    const newsletterForm = document.querySelector(".newsletter-input");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert("Thank you for subscribing to our newsletter!");
                emailInput.value = "";
            }
        });
    }
});

// Popup Form Functionality
document.addEventListener("DOMContentLoaded", function () {
    // Get all elements that should trigger the popup
    const enquiryTriggers = document.querySelectorAll(
        ".send-inquiry-btn, .enquire-btn, .enquiry, .learn-more, .journey-btn, .explore-btn, .cta-button"
    );
    const popup = document.getElementById("enquiryPopup");
    const closePopup = document.getElementById("closePopup");
    const enquiryForm = document.querySelector(".enquiry-form");
    const productSelect = document.getElementById("interest");
    const locationSelect = document.getElementById("location");

    // Open popup when any trigger is clicked
    enquiryTriggers.forEach((trigger) => {
        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Set context based on which button was clicked
            const card = this.closest(".service-card, .led-system-card");
            if (card) {
                // For service cards or LED system cards
                const product = card.querySelector("h3").textContent.toLowerCase();
                if (productSelect)
                    productSelect.value = product.includes("indoor")
                        ? "indoor"
                        : product.includes("outdoor")
                            ? "outdoor"
                            : product.includes("finepitch")
                                ? "finepitch"
                                : product.includes("creative")
                                    ? "creative"
                                    : "general";
            } else {
                // For other buttons (Get Quote, Start Journey, Explore)
                if (productSelect) productSelect.value = "general";
            }
            if (locationSelect) locationSelect.value = "";

            popup.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
    });

    // Close popup when X is clicked
    if (closePopup) {
        closePopup.addEventListener("click", function () {
            popup.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }

    // Close popup when clicking outside content
    if (popup) {
        popup.addEventListener("click", function (e) {
            if (e.target === popup) {
                popup.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }

    // Form submission
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: this.querySelector("#name").value,
                email: this.querySelector("#email").value,
                phone: this.querySelector("#phone").value,
                interest: this.querySelector("#interest").value,
                location: this.querySelector("#location").value,
                message: this.querySelector("#message").value,
            };

            // Here you would typically send the form data to your server
            console.log("Form submitted:", formData);
            alert("Thank you for your enquiry! We will contact you soon.");

            // Close popup and reset form
            popup.style.display = "none";
            document.body.style.overflow = "auto";
            this.reset();
        });
    }

    // Prevent card click when inner elements are clicked
    document
        .querySelectorAll(".service-card, .led-system-card")
        .forEach((card) => {
            card.addEventListener("click", function (e) {
                if (e.target.closest(".enquire-btn, .enquiry")) {
                    e.preventDefault();
                }
            });
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const industries = document.querySelectorAll(".industry");
    const carouselSlides = document.querySelectorAll(".carousel-slide");

    industries.forEach((industry) => {
        industry.addEventListener("click", function () {
            // Remove active class from all
            industries.forEach((i) => i.classList.remove("active"));
            carouselSlides.forEach((slide) => slide.classList.remove("active"));

            // Add active class to clicked industry
            this.classList.add("active");

            // Find matching slide and activate it
            const industryType = this.querySelector("img")
                .alt.toLowerCase()
                .replace(" ", "-");
            const matchingSlide = document.querySelector(
                `.carousel-slide[data-industry="${industryType}"]`
            );
            if (matchingSlide) {
                matchingSlide.classList.add("active");
            }
        });
    });

    // Activate first industry by default
    if (industries.length > 0) {
        industries[0].click();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Enhanced Auto-Sliding Carousel with Industry Sync
    const carousel = {
        elements: {
            slides: document.querySelectorAll(".carousel-slide"),
            industries: document.querySelectorAll(".industry"),
            industryContainer: document.querySelector(".industries"),
            carouselContainer: document.querySelector(".industry-carousel"),
        },
        state: {
            currentIndex: 0,
            slideInterval: null,
            isUserInteracting: false,
            interactionTimeout: null,
            isMobile: window.innerWidth <= 768,
        },

        init: function () {
            this.setupEventListeners();
            this.showSlide(0);
            this.startAutoSlide();
        },

        showSlide: function (index) {
            // Boundary check
            if (index < 0) index = this.elements.slides.length - 1;
            if (index >= this.elements.slides.length) index = 0;

            this.state.currentIndex = index;

            // Update active states
            this.elements.slides.forEach((slide) => slide.classList.remove("active"));
            this.elements.industries.forEach((ind) => ind.classList.remove("active"));

            this.elements.slides[index].classList.add("active");
            this.elements.industries[index].classList.add("active");

            // Scroll to center active industry on mobile
            if (this.state.isMobile && this.elements.industryContainer) {
                const activeIndustry = this.elements.industries[index];
                const containerWidth = this.elements.industryContainer.offsetWidth;
                const scrollPos =
                    activeIndustry.offsetLeft -
                    containerWidth / 2 +
                    activeIndustry.offsetWidth / 2;

                this.elements.industryContainer.scrollTo({
                    left: scrollPos,
                    behavior: "smooth",
                });
            }
        },

        nextSlide: function () {
            if (!this.state.isUserInteracting) {
                const nextIndex =
                    (this.state.currentIndex + 1) % this.elements.slides.length;
                this.showSlide(nextIndex);
            }
        },

        startAutoSlide: function () {
            if (this.state.isMobile && !this.state.slideInterval) {
                this.state.slideInterval = setInterval(() => this.nextSlide(), 3000);
            }
        },

        stopAutoSlide: function () {
            clearInterval(this.state.slideInterval);
            this.state.slideInterval = null;
        },

        handleUserInteraction: function () {
            this.state.isUserInteracting = true;
            this.stopAutoSlide();

            // Clear any existing timeout
            if (this.state.interactionTimeout) {
                clearTimeout(this.state.interactionTimeout);
            }

            // Resume auto-slide after period of inactivity
            this.state.interactionTimeout = setTimeout(() => {
                this.state.isUserInteracting = false;
                this.startAutoSlide();
            }, 5000);
        },

        setupEventListeners: function () {
            // Window resize handler
            window.addEventListener("resize", () => {
                this.state.isMobile = window.innerWidth <= 768;
                this.stopAutoSlide();
                this.startAutoSlide();
                this.showSlide(this.state.currentIndex);
            });

            // Industry click handlers
            this.elements.industries.forEach((industry, index) => {
                industry.addEventListener("click", () => {
                    this.handleUserInteraction();
                    this.showSlide(index);
                });

                // Keyboard accessibility
                industry.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        this.handleUserInteraction();
                        this.showSlide(index);
                    }
                });
            });

            // Interaction detection
            const interactionElements = [
                this.elements.industryContainer,
                this.elements.carouselContainer,
            ];

            interactionElements.forEach((el) => {
                if (el) {
                    el.addEventListener("touchstart", () => this.handleUserInteraction());
                    el.addEventListener("mousedown", () => this.handleUserInteraction());
                    el.addEventListener("wheel", () => this.handleUserInteraction());
                }
            });

            // Window focus/blur handling
            window.addEventListener("blur", () => this.stopAutoSlide());
            window.addEventListener("focus", () => {
                if (!this.state.isUserInteracting) {
                    this.startAutoSlide();
                }
            });
        },

        destroy: function () {
            this.stopAutoSlide();
            if (this.state.interactionTimeout) {
                clearTimeout(this.state.interactionTimeout);
            }
            // Remove all event listeners here in a real implementation
        },
    };

    // Initialize the carousel
    carousel.init();

    // For Single Page Applications (optional cleanup):
    // window.addEventListener('beforeunload', () => carousel.destroy());
});

// Quote Form Handling
document.addEventListener("DOMContentLoaded", function () {
    const quoteForm = document.getElementById("quoteForm");

    if (quoteForm) {
        quoteForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: this.querySelector("#name").value,
                email: this.querySelector("#email").value,
                phone: this.querySelector("#phone").value,
                interest: this.querySelector("#interest").value,
                location: this.querySelector("#location").value,
                message: this.querySelector("#message").value,
            };

            // Here you would typically send the form data to your server
            console.log("Form submitted:", formData);
            alert("Thank you for your inquiry! We will contact you soon.");

            // Reset form
            this.reset();
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const formWrapper = document.getElementById("formWrapper");
    formWrapper.classList.add("loading");

    // Fallback in case iframe events don't fire
    setTimeout(function () {
        if (formWrapper.classList.contains("loading")) {
            formWrapper.classList.remove("loading");
        }
    }, 5000);
});