document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("dynamic-banner");
  const welcome = "Welcome!";
  const name = "I'm Petras Guilherme Kulyumba –";
  const roles = [
    "Certified Ethical Hacker",
    "CompTIA Security+ Professional",
    "Cybersecurity Student",
    "Junior Penetration Tester",
    "SOC Analyst in Training",
  ];

  let roleIndex = 0;
  banner.innerText = `${welcome} ${name} ${roles[roleIndex]}`;

  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    banner.innerText = `${welcome} ${name} ${roles[roleIndex]}`;
  }, 3000);

  const navToggle = document.getElementById("nav-toggle");
  const navbar = document.getElementById("navbar");
  const settingsLink = document.getElementById("settings-link");
  const settingsPanel = document.getElementById("settings-panel");

  function setToggleIcon(isOpen) {
    navToggle.classList.toggle("hamburger", !isOpen);
    navToggle.classList.toggle("cross", isOpen);
  }

  navbar.classList.add("hidden");
  setToggleIcon(false);

  navToggle.addEventListener("click", () => {
    const isHidden = navbar.classList.toggle("hidden");
    setToggleIcon(!isHidden);
    settingsPanel.classList.add("hidden");
    settingsLink.setAttribute("aria-expanded", "false");
  });

  settingsLink.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = settingsPanel.classList.toggle("hidden");
    settingsLink.setAttribute("aria-expanded", !isHidden);
  });

  document.addEventListener("click", (e) => {
    if (!settingsPanel.classList.contains("hidden")) {
      if (!settingsPanel.contains(e.target) && e.target !== settingsLink) {
        settingsPanel.classList.add("hidden");
        settingsLink.setAttribute("aria-expanded", "false");
      }
    }
  });

  document.getElementById("toggle-dark-mode").addEventListener("click", () =>
    document.body.classList.toggle("dark-mode")
  );

  document.getElementById("toggle-readable-text").addEventListener("click", () =>
    document.body.classList.toggle("readable-text")
  );

  document.getElementById("toggle-solid-colors").addEventListener("click", () =>
    document.body.classList.toggle("solid-colors")
  );

  const sections = {
    home: document.getElementById("home"),
    about: document.getElementById("about"),
    projects: document.getElementById("projects"),
    blog: document.getElementById("blog"),
    contact: document.getElementById("contact"),
  };

  const navLinks = document.querySelectorAll("#navbar a.nav-link");
  const currentSectionLabel = document.getElementById("current-section");

  function showSection(id) {
    if (id !== "home") {
      sections[id].focus({ preventScroll: true });
    }

    sections[id].scrollIntoView({ behavior: "smooth" });
    const link = Array.from(navLinks).find(l => l.getAttribute("href") === `#${id}`);
    currentSectionLabel.textContent = link ? link.textContent.trim() : id;

    navbar.classList.add("hidden");
    setToggleIcon(false);
    settingsPanel.classList.add("hidden");
    settingsLink.setAttribute("aria-expanded", "false");

    navLinks.forEach(nav => nav.classList.remove("active"));
    if (link) link.classList.add("active");
  }

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showSection(link.getAttribute("href").substring(1));
    });
  });

  document.getElementById("read-more-btn").addEventListener("click", () => {
    showSection("about");
  });

  currentSectionLabel.textContent = "Home";
  navLinks[0].classList.add("active");
});
