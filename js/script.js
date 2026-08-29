// ===================== PRELOADER =====================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => preloader.classList.add("hide"), 350);
});

// ===================== NAVBAR SCROLL STATE =====================
const navbar = document.getElementById("navbar");
const onScroll = () => {
  if (window.scrollY > 40) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
};
window.addEventListener("scroll", onScroll);
onScroll();

// ===================== MOBILE MENU =====================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("mobile-open");
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("mobile-open");
  });
});
// Close the mobile menu on Escape or a tap outside it (not just via a nav link)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("mobile-open")) {
    hamburger.classList.remove("open");
    navLinks.classList.remove("mobile-open");
    hamburger.focus();
  }
});
document.addEventListener("click", (e) => {
  if (navLinks.classList.contains("mobile-open") && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove("open");
    navLinks.classList.remove("mobile-open");
  }
});

// ===================== ACTIVE NAV LINK ON SCROLL =====================
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll("#nav-links a");
const railDots = document.querySelectorAll(".rail-dot");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navAnchors.forEach(a => {
        // Only same-page fragment links (href="#...") participate in scroll-based
        // active-state tracking. Cross-page links (e.g. "products.html") keep
        // whatever active state was set in the HTML for the current page.
        const href = a.getAttribute("href");
        if (href.startsWith("#")) {
          a.classList.toggle("active", href === `#${id}`);
        }
      });
      railDots.forEach(dot => dot.classList.toggle("active", dot.dataset.target === id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(sec => sectionObserver.observe(sec));

// ===================== SCROLL RAIL PROGRESS =====================
const railTrack = document.querySelector(".rail-track");
const railProgress = document.getElementById("rail-progress");
if (railTrack && railProgress) {
  const updateRailProgress = () => {
    const trackHeight = railTrack.offsetHeight;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
    railProgress.style.height = `${fraction * trackHeight}px`;
  };
  window.addEventListener("scroll", updateRailProgress);
  window.addEventListener("resize", updateRailProgress);
  updateRailProgress();
}

// ===================== SCROLL REVEAL =====================
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = (el.dataset.delay ? Number(el.dataset.delay) : i % 4 * 90);
      setTimeout(() => el.classList.add("in-view"), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===================== ANIMATED STAT COUNTERS =====================
const counters = document.querySelectorAll(".stat-num");
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
};
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
counters.forEach(c => counterObserver.observe(c));

// ===================== WHATSAPP FLOATING MENU =====================
const waToggle = document.getElementById("wa-toggle");
const waMenu = document.getElementById("wa-menu");
waToggle.addEventListener("click", () => {
  waMenu.classList.toggle("open");
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".wa-float")) waMenu.classList.remove("open");
});

// ===================== FOOTER YEAR =====================
document.getElementById("year").textContent = new Date().getFullYear();
