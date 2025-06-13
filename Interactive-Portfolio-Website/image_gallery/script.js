const galleryImages = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

// Open Lightbox
galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        showImage();
        lightbox.style.display = "flex";
    });
});

// Close Lightbox
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Show Image in Lightbox
function showImage() {
    lightboxImg.src = galleryImages[currentIndex].src;
}

// Navigate Images
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? galleryImages.length - 1 : currentIndex - 1;
    showImage();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === galleryImages.length - 1) ? 0 : currentIndex + 1;
    showImage();
});

// Slideshow Mode (Auto-Cycle)
setInterval(() => {
    if (lightbox.style.display === "flex") {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showImage();
    }
}, 3000); // Change image every 3 seconds
