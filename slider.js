
// Select the slider elements
const sliderTrack = document.getElementById("sliderTrack");
const slides = Array.from(document.querySelectorAll(".slide"));
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const dotsContainer = document.getElementById("sliderDots");
const slideCounter = document.getElementById("slideCounter");

// Store the current slide index
let currentIndex = 0;

// Get the total number of slides
const totalSlides = slides.length;

// Create navigation dots dynamically
slides.forEach((slide, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.classList.add("slider-dot");
    dot.setAttribute("aria-label", `Go to image ${index + 1}`);

    dot.addEventListener("click", () => {
        goToSlide(index);
    });

    dotsContainer.appendChild(dot);
});

// Get all dynamically created dots
const dots = Array.from(
    dotsContainer.querySelectorAll(".slider-dot")
);

// Update the slider position and active dot
function updateSlider() {
    sliderTrack.style.transform =
        `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, index) => {
        const isActive = index === currentIndex;

        dot.classList.toggle("active", isActive);

        if (isActive) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }
    });

    slideCounter.textContent =
        `Image ${currentIndex + 1} of ${totalSlides}`;
}

// Display a particular slide
function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlider();
}

// Move to the next slide
function nextSlide() {
    goToSlide(currentIndex + 1);
}

// Move to the previous slide
function previousSlide() {
    goToSlide(currentIndex - 1);
}

// Add click events to the arrow buttons
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", previousSlide);

// Support keyboard arrow navigation
document.addEventListener("keydown", (event) => {
    // Do not interfere with users typing in form fields
    const tagName = event.target.tagName;

    if (
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        event.target.isContentEditable
    ) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextSlide();
    } else if (event.key === "ArrowLeft") {
        previousSlide();
    }
});

// Initialize the slider on the first image
updateSlider();
