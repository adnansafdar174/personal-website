// year
document.getElementById("year").textContent = new Date().getFullYear();

// mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const open = mobileMenu.style.display === "block";
  mobileMenu.style.display = open ? "none" : "block";
});

// close menu when clicking a link
mobileMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => (mobileMenu.style.display = "none"));
});

// reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// count-up numbers
function animateCount(el, to) {
  const duration = 900;
  const start = performance.now();
  const from = 0;

  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const val = Math.floor(from + (to - from) * t);
    el.textContent = val;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const nums = document.querySelectorAll(".num[data-count]");
const countObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el.dataset.done) return;
      el.dataset.done = "1";
      animateCount(el, parseInt(el.dataset.count, 10));
    });
  },
  { threshold: 0.4 }
);

nums.forEach((n) => countObs.observe(n));