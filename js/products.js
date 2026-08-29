// ===================== PRODUCTS PAGE: TABS, ACCORDION, SEARCH, SORT =====================
// Progressive enhancement: every tab, company, vehicle, and part-type card is real,
// static, crawlable HTML already. This script only adds the tab switching, accordion
// toggle, and live filtering/sorting on top — if it fails to run, both tab panels
// just stay visible and every card stays open, so the page still fully works.
(function () {
  const filtersBox = document.getElementById("vehicle-filters");
  if (!filtersBox) return;

  // ===================== TAB SWITCHING =====================
  const tabButtons = Array.from(document.querySelectorAll(".catalog-tab"));
  const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));

  function switchTab(target) {
    tabButtons.forEach((b) => {
      const active = b.dataset.tab === target;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", String(active));
    });
    tabPanels.forEach((panel) => {
      panel.hidden = panel.dataset.tabPanel !== target;
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });

  // ===================== SEARCH =====================
  const searchInput = document.getElementById("vehicle-search");
  const typeButtons = Array.from(document.querySelectorAll("#type-filter .filter-chip"));
  const companyGroups = Array.from(document.querySelectorAll(".company-group"));
  const groupLabels = Array.from(document.querySelectorAll("[data-group]"));
  const noResultsVehicles = document.getElementById("no-results");
  const filterCount = document.getElementById("filter-count");
  const partCards = Array.from(document.querySelectorAll("#part-type-grid .part-row, #part-type-grid .part-group"));
  const noResultsParts = document.getElementById("no-results-parts");

  let activeType = "all";
  let query = "";

  function openGroup(group) {
    group.classList.add("open");
    group.querySelector(".company-header").setAttribute("aria-expanded", "true");
  }
  function closeGroup(group) {
    group.classList.remove("open");
    group.querySelector(".company-header").setAttribute("aria-expanded", "false");
  }

  function applyVehicleFilters() {
    const searching = query !== "";
    let totalVisibleVehicles = 0;
    let totalVehicles = 0;

    companyGroups.forEach((group) => {
      const matchesType = activeType === "all" || group.dataset.type === activeType;
      const cards = Array.from(group.querySelectorAll(".vehicle-card"));
      totalVehicles += cards.length;

      let groupHasMatch = false;
      cards.forEach((card) => {
        const haystack = (card.dataset.name + " " + card.textContent).toLowerCase();
        const matchesQuery = !searching || haystack.includes(query);
        card.hidden = !matchesQuery;
        if (matchesQuery) {
          groupHasMatch = true;
          totalVisibleVehicles++;
        }
      });

      const groupVisible = matchesType && groupHasMatch;
      group.hidden = !groupVisible;

      if (groupVisible && searching) {
        openGroup(group);
      } else if (!searching) {
        closeGroup(group);
      }
    });

    groupLabels.forEach((el) => {
      const groupName = el.dataset.group;
      const anyVisible = companyGroups.some((g) => g.dataset.type === groupName && !g.hidden);
      el.hidden = !anyVisible;
    });

    noResultsVehicles.hidden = totalVisibleVehicles !== 0;

    if (!searching && activeType === "all") {
      filterCount.textContent = "";
    } else {
      filterCount.textContent = `Showing ${totalVisibleVehicles} of ${totalVehicles} vehicles`;
    }
  }

  function applyPartFilters() {
    if (!partCards.length) return;
    const searching = query !== "";
    let visibleCount = 0;
    partCards.forEach((card) => {
      const haystack = (card.dataset.name + " " + card.textContent).toLowerCase();
      const matches = !searching || haystack.includes(query);
      card.hidden = !matches;
      if (matches) visibleCount++;
    });
    if (noResultsParts) noResultsParts.hidden = visibleCount !== 0;
  }

  function applyFilters() {
    applyVehicleFilters();
    applyPartFilters();
  }

  // ===================== QUICK CATEGORY CHIPS =====================
  // Jump straight to a part category: switch to the Parts tab and reuse the
  // existing search filter to isolate that one category.
  const quickCatButtons = Array.from(document.querySelectorAll(".quick-cat-chip"));
  quickCatButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab("parts");
      const term = btn.dataset.category.toLowerCase();
      if (searchInput) {
        searchInput.value = btn.dataset.category;
      }
      query = term;
      applyFilters();
    });
  });

  // ===================== QUICK CATEGORY SCROLL ARROWS + SLOW AUTO-SCROLL =====================
  // Ticks along on its own at a slow, readable pace. The arrow buttons are the only
  // way to take manual control: a click pauses the auto-scroll briefly, then it
  // resumes. (Deliberately no hover-pause: browsers can fire a synthetic mouseenter
  // on layout shift alone, with no real cursor movement, which risked stalling the
  // auto-scroll permanently with no mouseleave to ever release it.)
  const quickCatTrack = document.getElementById("quick-categories");
  const quickCatPrev = document.getElementById("quick-cat-prev");
  const quickCatNext = document.getElementById("quick-cat-next");
  if (quickCatTrack && quickCatPrev && quickCatNext) {
    const updateArrows = () => {
      const maxScroll = quickCatTrack.scrollWidth - quickCatTrack.clientWidth;
      quickCatPrev.hidden = quickCatTrack.scrollLeft <= 4;
      quickCatNext.hidden = quickCatTrack.scrollLeft >= maxScroll - 4;
    };

    const AUTO_SPEED = 22; // px per second, slow and readable
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let autoDirection = 1;
    let autoPaused = false;
    let resumeTimer = null;
    let lastTime = null;
    // Track position ourselves in full float precision rather than reading
    // scrollLeft back each frame — the browser can round/snap that property,
    // which would silently eat the sub-pixel-per-frame deltas this slow a
    // scroll produces and stall it entirely.
    let currentPos = quickCatTrack.scrollLeft;

    const step = (now) => {
      if (lastTime === null) lastTime = now;
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (!autoPaused) {
        const maxScroll = quickCatTrack.scrollWidth - quickCatTrack.clientWidth;
        if (maxScroll > 0) {
          currentPos += autoDirection * AUTO_SPEED * dt;
          if (currentPos >= maxScroll) { currentPos = maxScroll; autoDirection = -1; }
          else if (currentPos <= 0) { currentPos = 0; autoDirection = 1; }
          quickCatTrack.scrollLeft = currentPos;
        }
      }
      requestAnimationFrame(step);
    };

    const pauseThenResume = (delay) => {
      autoPaused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        autoPaused = false;
        lastTime = null;
        currentPos = quickCatTrack.scrollLeft; // resync after manual scroll
      }, delay);
    };

    quickCatPrev.addEventListener("click", () => {
      quickCatTrack.scrollBy({ left: -220, behavior: "smooth" });
      pauseThenResume(4000);
    });
    quickCatNext.addEventListener("click", () => {
      quickCatTrack.scrollBy({ left: 220, behavior: "smooth" });
      pauseThenResume(4000);
    });
    quickCatTrack.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    updateArrows();

    if (!reduceMotion) requestAnimationFrame(step);
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      query = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }

  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      typeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeType = btn.dataset.filterType;
      applyVehicleFilters();
    });
  });

  // ===================== ACCORDION TOGGLE =====================
  companyGroups.forEach((group) => {
    const header = group.querySelector(".company-header");
    header.addEventListener("click", () => {
      const isOpen = group.classList.toggle("open");
      header.setAttribute("aria-expanded", String(isOpen));
    });
  });

  const partGroups = Array.from(document.querySelectorAll(".part-group"));
  partGroups.forEach((group) => {
    const header = group.querySelector(".part-header");
    header.addEventListener("click", () => {
      const isOpen = group.classList.toggle("open");
      header.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // ===================== SORT: SHOP BY PART TYPE =====================
  const sortGrid = document.getElementById("part-type-grid");
  const sortButtons = Array.from(document.querySelectorAll(".sort-row .filter-chip"));

  function sortPartTypes(mode) {
    if (!sortGrid) return;
    const items = Array.from(sortGrid.children);
    items.sort((a, b) => {
      if (mode === "alpha") {
        return a.dataset.name.localeCompare(b.dataset.name);
      }
      return Number(b.dataset.count) - Number(a.dataset.count);
    });
    items.forEach((item) => sortGrid.appendChild(item));
  }

  sortButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sortButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      sortPartTypes(btn.dataset.sort);
    });
  });
})();
