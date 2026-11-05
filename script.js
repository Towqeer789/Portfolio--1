/* ============================================================
   EDIT YOUR CONTACT DETAILS HERE
   Leave a value empty ("") and that button is hidden automatically.
   ============================================================ */
const CONFIG = {
  email: "",          // e.g. "yourname@gmail.com"
  phone: "",          // e.g. "+91 98765 43210"
  github: "https://github.com/Towqeer789",
  linkedin: ""        // add your LinkedIn URL later, if you create one
};

document.documentElement.classList.add("js");

/* ---------- Contact buttons ---------- */
(function buildContact() {
  const list = document.getElementById("contact-list");
  if (!list) return;
  const items = [];
  if (CONFIG.email)    items.push({ label: "Email: " + CONFIG.email, href: "mailto:" + CONFIG.email });
  if (CONFIG.phone)    items.push({ label: "Phone: " + CONFIG.phone, href: "tel:" + CONFIG.phone.replace(/[^+\d]/g, "") });
  if (CONFIG.github)   items.push({ label: "GitHub", href: CONFIG.github, external: true });
  if (CONFIG.linkedin) items.push({ label: "LinkedIn", href: CONFIG.linkedin, external: true });

  items.forEach(function (item) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = item.label;
    a.href = item.href;
    if (item.external) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    li.appendChild(a);
    list.appendChild(li);
  });
})();

/* ---------- Theme toggle (remembers choice) ---------- */
(function theme() {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  btn.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

/* ---------- Mobile menu ---------- */
(function menu() {
  const btn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  btn.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();

/* ---------- Scroll reveal + active nav link ---------- */
(function scrollEffects() {
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });

    const links = document.querySelectorAll("nav a");
    const sections = Array.from(links).map(function (a) { return document.querySelector(a.getAttribute("href")); });
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }
})();

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
