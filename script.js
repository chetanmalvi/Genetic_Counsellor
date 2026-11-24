// GENESIS Genetic Counselling — website interactions
// Replace CALENDAR_BOOKING_URL with the public Google Calendar appointment schedule URL.
// Example: https://calendar.google.com/calendar/appointments/schedules/...

const CALENDAR_BOOKING_URL = ""; // Add the counselor's public Google Calendar booking URL here.

const services = [
  "Carrier Screening Counseling",
  "Pre-marital Counseling",
  "Pre-conception Counseling",
  "Pre-natal Counseling",
  "Pre-test Counseling",
  "Post-test Counseling"
];

const areas = [
  "Cardiovascular","Gastrointestinal","Endocrinological","Neuro-muscular",
  "Nephrological","Reproductive","Skeletal & Connective Tissue","ENT",
  "Paediatrics","Hepatological","Dermatological","Haematological",
  "Metabolic","Immunological"
];

const focusAreas = [
  "Early & Late Onset Diseases","Rare Diseases","Oncology",
  "Birth Defects","Dysmorphic Features","Cytogenetic Disorders"
];

const conditions = [
  {name:"Down Syndrome",category:"Chromosomal",description:"A chromosomal condition involving an additional copy of chromosome 21."},
  {name:"Turner Syndrome",category:"Chromosomal",description:"A condition involving complete or partial absence of one X chromosome."},
  {name:"Klinefelter Syndrome",category:"Chromosomal",description:"A chromosomal variation commonly involving an additional X chromosome."},
  {name:"Trisomy 13",category:"Chromosomal",description:"A chromosomal condition involving an additional copy of chromosome 13."},
  {name:"Trisomy 18",category:"Chromosomal",description:"A chromosomal condition involving an additional copy of chromosome 18."},
  {name:"Parkinson’s Disease",category:"Neurological",description:"A neurological disorder with genetic contributors in some cases."},
  {name:"Alzheimer’s Disease",category:"Neurological",description:"A neurodegenerative condition with genetic factors in certain forms."},
  {name:"Autism",category:"Neurological",description:"A neurodevelopmental condition with complex genetic contributions."},
  {name:"Duchenne Muscular Dystrophy (DMD)",category:"Neurological",description:"An inherited neuromuscular disorder linked to changes in the DMD gene."},
  {name:"Spinal Muscular Atrophy (SMA)",category:"Neurological",description:"An inherited neuromuscular disorder commonly involving the SMN1 gene."},
  {name:"NOTCH2NLC-related Disorder",category:"Neurological",description:"A disorder associated with repeat expansions in NOTCH2NLC."},
  {name:"Sickle Cell Disease",category:"Metabolic",description:"An inherited haemoglobin disorder."},
  {name:"Cystic Fibrosis",category:"Metabolic",description:"An inherited condition involving CFTR gene changes."},
  {name:"Tay-Sachs Disease",category:"Metabolic",description:"An inherited metabolic disorder associated with HEXA gene changes."},
  {name:"Marfan Syndrome",category:"Other",description:"An inherited connective tissue condition often involving FBN1."},
  {name:"Retinitis Pigmentosa",category:"Other",description:"A group of inherited retinal disorders."},
  {name:"Neurofibromatosis Type 1",category:"Other",description:"An inherited condition associated with changes in the NF1 gene."},
  {name:"Familial Hypercholesterolemia",category:"Other",description:"An inherited condition associated with high LDL cholesterol."},
  {name:"Hereditary Cancer",category:"Other",description:"Some inherited gene variants increase the risk of certain cancers."}
];

const faqs = [
  ["What is genetic counseling?","It is a process of understanding genetic risks, testing options and results to support informed decisions."],
  ["Who should consider genetic counseling?","Individuals or families with a personal or family history of inherited conditions, or those considering genetic testing or reproductive screening, may find counseling helpful."],
  ["Are online consultations available?","Online consultations can be arranged by prior appointment confirmation."],
  ["Does genetic counseling mean I need a genetic test?","No. Counseling helps you understand whether testing may be appropriate and its potential benefits, limitations and possible outcomes."]
];

function renderServices() {
  const icons = ["♡","♧","✿","⌂","⌕","▤"];
  document.getElementById("serviceCards").innerHTML = services.map((service, index) => `
    <article class="feature-card service-card">
      <span class="feature-icon">${icons[index]}</span>
      <h3>${service}</h3>
      <p>Personalised guidance to help you understand your genetic health and available options.</p>
    </article>`).join("");

  // Populate the booking form from the same service list.
  const select = document.getElementById("service");
  services.forEach(service => {
    const option = document.createElement("option");
    option.value = service;
    option.textContent = service;
    select.appendChild(option);
  });
}

function renderAreas() {
  document.getElementById("areaGrid").innerHTML = areas.map(area =>
    `<div class="area-item">⌬ &nbsp;${area}</div>`).join("");
  document.getElementById("focusList").innerHTML = focusAreas.map(area =>
    `<span class="pill">${area}</span>`).join("");
}

let activeFilter = "All";
function renderConditions() {
  const categories = ["All","Chromosomal","Neurological","Metabolic","Other"];
  const filters = document.getElementById("conditionFilters");
  filters.innerHTML = categories.map(category =>
    `<button class="filter-button ${category === activeFilter ? "active" : ""}" data-filter="${category}">${category}</button>`
  ).join("");

  const visible = conditions.filter(condition =>
    activeFilter === "All" || condition.category === activeFilter
  );
  document.getElementById("conditionCards").innerHTML = visible.map(condition => `
    <article class="feature-card condition-card">
      <span class="pill">${condition.category}</span>
      <h3>${condition.name}</h3>
      <p>${condition.description}</p>
      <a class="condition-link" href="#booking">Discuss with counselor →</a>
    </article>`).join("");
}

function renderFaqs() {
  document.getElementById("faqList").innerHTML = faqs.map(([question, answer], index) => `
    <article class="faq-item">
      <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-answer-${index}">
        <span>${question}</span><span class="faq-symbol" aria-hidden="true">＋</span>
      </button>
      <div class="faq-answer" id="faq-answer-${index}">${answer}</div>
    </article>`).join("");
}

function setupNavigation() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function setupFaqs() {
  document.getElementById("faqList").addEventListener("click", event => {
    const button = event.target.closest(".faq-question");
    if (!button) return;
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.querySelector(".faq-symbol").textContent = isOpen ? "−" : "＋";
  });
}

function setupChat() {
  const button = document.getElementById("chatButton");
  const panel = document.getElementById("chatPanel");
  const close = document.getElementById("chatClose");
  const closePanel = () => {
    panel.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  };
  button.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
  close.addEventListener("click", closePanel);
  document.getElementById("chatBook").addEventListener("click", closePanel);
}

function setupBookingForm() {
  const form = document.getElementById("bookingForm");
  const dateInput = document.getElementById("date");
  const message = document.getElementById("formMessage");

  // Prevent selecting a date in the past, using the visitor's local date.
  const now = new Date();
  const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString().slice(0, 10);
  dateInput.min = localToday;

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const formData = Object.fromEntries(new FormData(form).entries());
    message.classList.add("show");

    if (CALENDAR_BOOKING_URL.trim()) {
      // The calendar opens in a new tab. The patient still needs to complete
      // Google's booking flow to reserve a real available slot.
      message.textContent = "Your details are ready. Please complete your appointment booking in Google Calendar.";
      window.open(CALENDAR_BOOKING_URL, "_blank", "noopener,noreferrer");
    } else {
      message.textContent =
        `Thank you, ${formData.name}. This demo has validated your request, but it has not been sent and no appointment has been booked. The website owner must add the public Google Calendar appointment schedule URL in script.js.`;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderAreas();
  renderConditions();
  renderFaqs();
  setupNavigation();
  setupFaqs();
  setupChat();
  setupBookingForm();
  document.getElementById("year").textContent = new Date().getFullYear();

  document.getElementById("conditionFilters").addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    renderConditions();
  });
});
