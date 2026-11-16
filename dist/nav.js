// Shared three-section navigation. Root URLs work on every generated page.
const CATEGORY_MENU_DESCRIPTIONS = {
  "pimple-patches": "Hydrocolloid and targeted spot care",
  "korean-sunscreen": "Daily SPF for every skin type",
  "sheet-masks": "Hydration, soothing and glow",
  "snail-serum": "Essences and barrier support",
  "lip-tint": "Gloss, velvet and longwear",
  "cushion-foundation": "Coverage, finish and shade range",
};

function renderNavigation(activeSection = "", activeKey = "") {
  const nav = document.getElementById("topnav");
  if (!nav) return;

  const rankings = Object.entries(CATEGORIES).map(([key, category]) => `
    <a class="nav-menu-link ${activeSection === "rankings" && key === activeKey ? "active" : ""}"
       href="/${key}/" ${activeSection === "rankings" && key === activeKey ? 'aria-current="page"' : ""}>
      <span class="menu-title">${category.name}</span>
      <span class="menu-description">${CATEGORY_MENU_DESCRIPTIONS[key] || "Compare the current shortlist"}</span>
    </a>`).join("");

  const skinTypes = Object.entries(SKIN_PROFILES).map(([key, skin]) => `
    <a class="nav-menu-link ${activeSection === "skin" && key === activeKey ? "active" : ""}"
       href="/${skin.path}/" ${activeSection === "skin" && key === activeKey ? 'aria-current="page"' : ""}>
      <span class="menu-title">${skin.navName}</span>
      <span class="menu-description">${skin.menuDescription}</span>
    </a>`).join("");

  nav.setAttribute("aria-label", "Primary navigation");
  nav.innerHTML = `
    <details class="nav-item ${activeSection === "rankings" ? "active" : ""}">
      <summary class="nav-link">Rankings<i data-lucide="chevron-down"></i></summary>
      <div class="nav-menu">
        ${rankings}
        <a class="menu-all" href="/">All rankings<i data-lucide="arrow-up-right"></i></a>
      </div>
    </details>
    <details class="nav-item ${activeSection === "skin" ? "active" : ""}">
      <summary class="nav-link">By Skin Type<i data-lucide="chevron-down"></i></summary>
      <div class="nav-menu skin-menu">
        ${skinTypes}
        <a class="menu-all" href="/quiz.html">Get a personalized match<i data-lucide="arrow-up-right"></i></a>
      </div>
    </details>
    <a class="nav-link ${activeSection === "blog" ? "active" : ""}" href="/blog/"
      ${activeSection === "blog" ? 'aria-current="page"' : ""}>Blog</a>`;

  const menus = [...nav.querySelectorAll("details.nav-item")];
  menus.forEach(menu => {
    menu.addEventListener("toggle", () => {
      if (menu.open) menus.forEach(other => { if (other !== menu) other.open = false; });
    });
  });

  if (!window.__decodeNavHandlers) {
    document.addEventListener("click", event => {
      document.querySelectorAll("details.nav-item[open]").forEach(menu => {
        if (!menu.contains(event.target)) menu.open = false;
      });
    });
    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      const openMenu = document.querySelector("details.nav-item[open]");
      if (!openMenu) return;
      openMenu.open = false;
      openMenu.querySelector("summary").focus();
    });
    window.__decodeNavHandlers = true;
  }
}
