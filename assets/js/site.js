const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");
const filterButtons = document.querySelectorAll(".filter-btn");
const productSearch = document.querySelector("#productSearch");
const productGrid = document.querySelector("#productGrid");
const galleryGrid = document.querySelector("#galleryGrid");
const lightbox = document.querySelector("#imageLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxClose = document.querySelector(".lightbox-close");

const imageFiles = [
  "assets/images/kich01.jpg",
  "assets/images/cupBoard.jpg",
  "assets/images/bedroom01.jpg",
  "assets/images/shoes.jpg",
  "assets/images/other07.jpg",
  "assets/images/other06.jpg",
  "assets/images/banner-01.png",
  "assets/images/other04.jpg",
  "assets/images/livingroom06.jpg",
  "assets/images/epoxy.jpg",
  "assets/images/livingroom01.jpg",
  "assets/images/banner-02.png",
  "assets/images/livingroom02.jpg",
  "assets/images/shoes01.jpg",
  "assets/images/sofa03.jpg",
  "assets/images/kich02.jpg",
  "assets/images/coffee02.jpg",
  "assets/images/livingroom03.jpg",
  "assets/images/exterior01.jpg",
  "assets/images/livingroom04.jpg",
  "assets/images/cofee.jpg",
  "assets/images/other02.jpg",
  "assets/images/mirror.jpg",
  "assets/images/cupBoard1.jpg",
  "assets/images/other03.jpg",
  "assets/images/livingroom05.jpg",
  "assets/images/coffee01.jpg",
  "assets/images/epoxy01.jpg",
  "assets/images/sofa01.jpg",
  "assets/images/shoes02.jpg",
  "assets/images/kich03.jpg",
  "assets/images/sofa02.jpg",
  "assets/images/shoes03.jpg",
  "assets/images/sofa.jpg",
  "assets/images/bedroom02.jpg",
  "assets/images/other05.jpg",
  "assets/images/bedroom05.jpg",
  "assets/images/other01.jpg",
  "assets/images/bedroom03.jpg",
  "assets/images/mirror01.jpg",
  "assets/images/kich04.jpg",
  "assets/images/exterior.jpg"
];

const galleryImages = [
  ["assets/images/logo.png", "NeZa logo"],
  ["assets/images/ig.png", "Instagram"],
  ["assets/images/iconig.png", "Instagram icon"],
  ["assets/images/fb.png", "Facebook"],
  ["assets/images/furn.png", "Furniture mark"],
  ["assets/images/42phone.png", "Phone"],
  ["assets/images/author.jpg", "Owner avatar"],
  ["assets/images/single-author.jpg", "Gervais Ndayambaje"]
];

const categoryNames = {
  exterior: "Exterior Design",
  living: "Living Room",
  kitchen: "Kitchen Field",
  bedroom: "Bedroom",
  shoes: "Shoes Stand"
};

function filenameFromPath(path) {
  return path.split("/").pop().replace(/\.[^.]+$/, "");
}

function readableName(path) {
  const raw = filenameFromPath(path)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\d+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return raw.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function categoryForImage(path) {
  const name = filenameFromPath(path).toLowerCase();

  if (name.includes("coffee") || name.includes("cofee") || name.includes("exterior") || name.includes("other")) {
    return "exterior";
  }

  if (name.includes("epoxy") || name.includes("livingroom") || name.includes("living room") || name.includes("sofa")) {
    return "living";
  }

  if (name.includes("kich") || name.includes("kitchen") || name.includes("cupboard")) {
    return "kitchen";
  }

  if (name.includes("mirror") || name.includes("bedroom")) {
    return "bedroom";
  }

  if (name.includes("shoes") || name.includes("shoe")) {
    return "shoes";
  }

  return "";
}

const products = imageFiles
  .map((src) => {
    const category = categoryForImage(src);

    return {
      src,
      category,
      title: readableName(src)
    };
  })
  .filter((product) => product.category);

function renderProducts() {
  productGrid.innerHTML = products.map((product) => `
    <article class="product-card" data-category="${product.category}" data-text="${`${product.title} ${categoryNames[product.category]}`.toLowerCase()}">
      <button class="product-image-button" type="button" data-src="${product.src}" data-title="${product.title}">
        <img src="${product.src}" alt="${product.title}" loading="lazy">
      </button>
      <div class="product-body">
        <span class="category-label">${categoryNames[product.category]}</span>
        <h3>${product.title}</h3>
        <div class="meta"><span>Type<strong>${categoryNames[product.category]}</strong></span><span>Action<strong>Click image</strong></span></div>
      </div>
    </article>
  `).join("");
}

function renderGallery() {
  galleryGrid.innerHTML = galleryImages.map(([src, title]) => `
    <figure class="gallery-item">
      <img src="${src}" alt="${title}" loading="lazy">
      <figcaption>${title}</figcaption>
    </figure>
  `).join("");
}

function filterProducts() {
  const active = document.querySelector(".filter-btn.active").dataset.filter;
  const term = productSearch.value.trim().toLowerCase();

  document.querySelectorAll(".product-card").forEach((product) => {
    const categoryMatch = active === "all" || product.dataset.category === active;
    const textMatch = product.dataset.text.includes(term);
    product.hidden = !(categoryMatch && textMatch);
  });
}

function openLightbox(src, title) {
  lightboxImage.src = src;
  lightboxImage.alt = title;
  lightboxTitle.textContent = title;
  lightbox.hidden = false;
  document.body.classList.add("no-scroll");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.classList.remove("no-scroll");
}

function activateFilter(filter) {
  filterButtons.forEach((item) => {
    item.classList.toggle("active", item.dataset.filter === filter);
  });
  filterProducts();
}

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open ? "true" : "false");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateFilter(button.dataset.filter);
  });
});

document.querySelectorAll(".category").forEach((category) => {
  category.addEventListener("click", () => {
    const filter = category.dataset.filter;

    if (!filter) {
      return;
    }

    activateFilter(filter);
    document.querySelector("#explore").scrollIntoView({ behavior: "smooth" });
  });
});

productSearch.addEventListener("input", filterProducts);

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".product-image-button");

  if (!button) {
    return;
  }

  openLightbox(button.dataset.src, button.dataset.title);
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});

document.querySelector("#requestForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    "Hello NeZa Furniture, I need custom furniture.",
    `Furniture: ${data.get("furnitureName")}`,
    `Category: ${data.get("category")}`,
    `Name: ${data.get("clientName")}`,
    `Phone: ${data.get("phone")}`,
    `Details: ${data.get("description")}`
  ].join("\n");
  window.open(`https://wa.me/250789862868?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

renderProducts();
renderGallery();
filterProducts();
