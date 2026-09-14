// PAGES
const items = [
     { name: "(2026) fugitive digital archives", page: "pages/fugitivedigitalarchives.html", category: "installation, zine"},
    { name: "(2026) Cyanotypes as Tools for Critical and Creative Data Capture", page: "pages/cyanotype.html", category: "workshop" },
    { name: "(2026) extraordinary", page: "pages/extraordinary.html", category: "website" },
    { name: "(2026) Black Zine Fair", page: "pages/bzf-site.html", category: "website" },
    { name: "(2025) i want the screen to remember me", page: "pages/rememberme.html", category: "installation, zine"}
];

let selectedItem = null;
const navList = document.querySelector(".nav-list");
const content = document.querySelector(".content");
const moreLink = document.querySelector(".more-link");

function renderList() {
    navList.innerHTML = "";

    for (const item of items) {
        const div = document.createElement("div");
        const isSelected = item === selectedItem;

        div.className = "nav-item" + (isSelected ? " selected" : "");

        div.innerHTML = `
            <span class="marker">${isSelected ? "★" : "–"}</span>
            <span class="label">${item.name}</span>
            <span class="category">${item.category}</span>
        `;

        div.onclick = () => {
            if (item === selectedItem) {
                selectedItem = null;
                content.innerHTML = "";
            } else {
                selectedItem = item;
                loadPage(item.page);
            }
            renderList();
        };

        navList.appendChild(div);
    }
}

async function loadPage(page) {
    const response = await fetch(page);
    const html = await response.text();
    content.innerHTML = html;
}

moreLink.onclick = () => {
    selectedItem = null;
    renderList();
    loadPage("pages/about.html");
}

renderList();