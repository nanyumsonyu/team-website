/*===========================================
Team website script(CSC216,lab 2)
Loaded on page with 'defer',so the HTML is fully parsed before any of this code runs
============================================*/
/*------------------1.shared: runs on every page----------*/

//put the current year on the footer.
const yearEl = document.querySelector("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

//open and close the navigation menu on smalll screens
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

//Darkmode ,,remembered across pages and visits.
const themeToggle = document.querySelector(".theme-toggle");
const THEME_KEY = "team-theme";

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }
}

applyTheme(localStorage.getItem(THEME_KEY));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });
}

/*--------2.projects page-----------*/
const projects = [
  {
    title: "Personal landing page",
    category: "html",
    description: "A single semantic HTML page with headings,lists and links.",
  },
  {
    title: "Responsive card grid",
    category: "css",
    description:
      "A layout that goes from one column on phones to three on laptops.",
  },
  {
    title: "Tip calculator",
    category: "js",
    description: "Reads two Inputs and updates the total as you type",
  },
  {
    title: "Accessible contact form",
    category: "html",
    description:
      "Labelled fields,helpful errors and keyboard-friendly controls.",
  },
  {
    title: "Darkmode toggle",
    category: "js",
    description: "Switches the color thee and remembers the choice.",
  },
    {
    title: "Flexbox navigation bar",
    category: "css",
    description: "A header that collapses into amenu button on small screens.",
  },
  {
    title: "Git branching practice",
    category: "git",
    description: "Created a collaborated repository and committed our changes in the repo. ",
  },
  {
    title: "Team README",
    category: "readme",
    description: "A markdown that explains all the changes we have made in the project, and answers all the questions.",
  },
];

const categoryNames = { html: "HTML", css: "CSS", js: "JavaScript", git: "Git", readme: "README"  };

const projectList = document.querySelector("#project-list");
const projectCount = document.querySelector("#project-count");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderProjects(filter) {
  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  projectList.replaceChildren();

  visible.forEach((project) => {
    const card = document.createElement("article");
    card.className = "card";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = categoryNames[project.category];

    const heading = document.createElement("h3");
    heading.textContent = project.title;

    const text = document.createElement("p");
    text.textContent = project.description;

    card.append(tag, heading, text);
    projectList.append(card);
  });

  projectCount.textContent = `showing ${visible.length} of ${projects.length} projects`;
}

if (projectList) {
  renderProjects("all");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      renderProjects(button.dataset.filter);
    });
  });
}

/*-----------------3.contact page------------*/
const form = document.querySelector("#contact-form");

if (form) {
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message");
  const charCount = document.querySelector("#char-count");
  const statusEl = document.querySelector("#form-status");

  //live character counter.
  messageInput.addEventListener("input", () => {
    charCount.textContent = messageInput.value.length;
  });

  //show(or clear) the error messageunder one field.
  function showError(input, message) {
    const errorEl = document.querySelector(`#${input.id}-error`);
    errorEl.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  //check every field.Returns true only if all are valid
  function validateForm() {
    let isValid = true;

    if (nameInput.value.trim() === "") {
      showError(nameInput, "Please enter your name.");
      isValid = false;
    } else {
      showError(nameInput, "");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, "Enter an email adress like name@example.com.");
      isValid = false;
    } else {
      showError(emailInput, "");
    }

    if (messageInput.value.trim().length < 20) {
      showError(messageInput, "Your message needs at least 20 characters.");
      isValid = false;
    } else {
      showError(messageInput, "");
    }

    return isValid;
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    statusEl.textContent = "";

    if (!validateForm()) {
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    const firstName = nameInput.value.trim().split(" ")[0];
    statusEl.textContent = `Thanks,${firstName}! Your message is ready. (we connect this form to a real server later.)`;
    form.reset();
    charCount.textContent = "0";
  });
}
