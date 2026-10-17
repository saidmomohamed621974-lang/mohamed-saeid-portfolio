/* ========================================
   MOHAMED SAEED — PORTFOLIO JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    // HEADER SCROLL EFFECT
    const header = document.querySelector(".site-header");

    function updateHeader() {
        if (!header) return;

        header.classList.toggle("scrolled", window.scrollY > 40);
    }

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    // MOBILE MENU
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';
            });
        });

        document.addEventListener("click", (event) => {
            if (
                !nav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                nav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';
            }
        });
    }


    // REVEAL ELEMENTS ON SCROLL
    const revealSelectors = [
        ".about-content",
        ".experience-content",
        ".skill",
        ".car-card",
        ".gallery-item",
        ".company-info",
        ".contact-content"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(", ")
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    // GALLERY LIGHTBOX
    const galleryItems = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const closeButton = lightbox?.querySelector(".lightbox-close");
    const prevButton = lightbox?.querySelector(".lightbox-prev");
    const nextButton = lightbox?.querySelector(".lightbox-next");
    const counter = lightbox?.querySelector(".lightbox-counter");

    let currentImageIndex = 0;

    function showImage(index) {
        if (!lightbox || !lightboxImage || galleryItems.length === 0) {
            return;
        }

        currentImageIndex =
            (index + galleryItems.length) % galleryItems.length;

        const galleryImage =
            galleryItems[currentImageIndex].querySelector("img");

        if (!galleryImage) return;

        lightboxImage.src = galleryImage.src;
        lightboxImage.alt = galleryImage.alt || "Work gallery image";

        if (counter) {
            counter.textContent =
                `${currentImageIndex + 1} / ${galleryItems.length}`;
        }

        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            showImage(index);
        });
    });

    closeButton?.addEventListener("click", closeLightbox);

    prevButton?.addEventListener("click", () => {
        showImage(currentImageIndex - 1);
    });

    nextButton?.addEventListener("click", () => {
        showImage(currentImageIndex + 1);
    });

    lightbox?.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!lightbox?.classList.contains("is-open")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showImage(currentImageIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            showImage(currentImageIndex - 1);
        }
    });


    // BACK TO TOP
    const backToTop = document.querySelector(".back-to-top");

    backToTop?.addEventListener("click", (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // CURRENT YEAR
    const yearElements = document.querySelectorAll(
        "#current-year, .current-year"
    );

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
    // EXPERIENCE COUNTER
    const counters = document.querySelectorAll(".experience-value");

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = Number(counter.dataset.count) || 20;
                const duration = 1800;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const progress = Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                    const easedProgress = 1 - Math.pow(1 - progress, 4);
                    counter.textContent = Math.floor(target * easedProgress);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            });
        }, { threshold: 0.4 });

        counters.forEach((counter) => counterObserver.observe(counter));
    } else {
        counters.forEach((counter) => {
            counter.textContent = counter.dataset.count || "20";
        });
    }

    // HERO TYPING EFFECT
    const typingText = document.getElementById("typing-text");

    if (typingText) {
        const words = [
            "AUTOMOTIVE PRODUCTION",
            "INDUSTRIAL EXPERIENCE",
            "QUALITY & PERFORMANCE"
        ];

        let wordIndex = 0;
        let charIndex = words[0].length;
        let deleting = true;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (deleting) {
                charIndex--;
                typingText.textContent = currentWord.slice(0, Math.max(0, charIndex));

                if (charIndex <= 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(typeEffect, 350);
                    return;
                }

                setTimeout(typeEffect, 45);
            } else {
                const nextWord = words[wordIndex];
                charIndex++;
                typingText.textContent = nextWord.slice(0, charIndex);

                if (charIndex >= nextWord.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1800);
                    return;
                }

                setTimeout(typeEffect, 75);
            }
        }

        setTimeout(typeEffect, 1800);
    }

});