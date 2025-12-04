'use strict';

/* ---------- Helper ---------- */
const elementToggleFunc = elem => elem.classList.toggle("active");


/* ---------- Sidebar ---------- */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}


/* ---------- Testimonials Modal ---------- */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

if (modalContainer && overlay) {
  const testimonialsModalFunc = () => {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  testimonialsItem.forEach(item => {
    item.addEventListener("click", () => {
      modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}


/* ---------- Custom Select Filter ---------- */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]"); // FIXED TYPO
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select && selectValue) {
  select.addEventListener("click", () => elementToggleFunc(select));

  const filterFunc = selectedValue => {
    filterItems.forEach(item => {
      const match = selectedValue === "all" || selectedValue === item.dataset.category;
      item.classList.toggle("active", match);
    });
  };

  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      let selectedValue = item.innerText.toLowerCase();
      selectValue.innerText = item.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });

  // Large screen filter buttons
  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
}


/* ---------- Contact Form Validation ---------- */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      formBtn.disabled = !form.checkValidity();
    });
  });
}


/* ---------- Page Navigation (final section) ---------- */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", () => {
    const target = link.textContent.trim().toLowerCase();

    pages.forEach(page => {
      page.classList.toggle("active", page.dataset.page === target);
    });

    navigationLinks.forEach(btn => btn.classList.remove("active"));
    link.classList.add("active");

    window.scrollTo(0, 0);
  });
});
