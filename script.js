const startButton = document.getElementById("startButton");
const startTarget = document.getElementById("story");
const musicButton = document.getElementById("musicButton");
const songButton = document.getElementById("songButton");
const musicText = document.getElementById("musicText");
const frame = document.getElementById("musicFrame");

let musicStarted = false;

function tryStartMusic() {
  // The YouTube iframe is configured with autoplay=1. If the browser blocks
  // audible autoplay, opening/using this button is the user-gesture fallback.
  if (!musicStarted) {
    musicStarted = true;
    frame.src = "https://www.youtube.com/embed/mZOf5_rIfK4?autoplay=1&loop=1&playlist=mZOf5_rIfK4&controls=0&rel=0&playsinline=1";
    musicText.textContent = "Playing ♫";
    musicButton.classList.add("playing");
  }
}

startButton.addEventListener("click", () => {
  startTarget.scrollIntoView({ behavior: "smooth" });
  tryStartMusic();
});

musicButton.addEventListener("click", tryStartMusic);
songButton.addEventListener("click", tryStartMusic);

// Try once on page load, then rely on the first tap if the browser blocks autoplay.
window.addEventListener("load", () => {
  setTimeout(tryStartMusic, 500);
});

// Reveal sections as she scrolls.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
