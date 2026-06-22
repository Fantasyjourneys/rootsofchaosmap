const mapWidth = 8398;
const mapHeight = 4298;

const bounds = [[0, 0], [mapHeight, mapWidth]];

/* 1. CREATE MAP */
const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -3,
});

/* 2. FIX SIDEBAR TOUCH ISSUES (IMPORTANT) */
const sidebar = document.querySelector('.sidebar');

L.DomEvent.disableClickPropagation(sidebar);
L.DomEvent.disableScrollPropagation(sidebar);
L.DomEvent.disableClickPropagation(sidebar);
sidebar.addEventListener('touchmove', function(e) {
    e.stopPropagation();
}, { passive: true });

/* 3. BASE MAP */
L.imageOverlay('RoCmap.png', bounds).addTo(map);

/* 4. ROUTES (START HIDDEN) */
const routes = {
    dumai: L.imageOverlay('Dumai.png', bounds, { opacity: 0 }),
    glorian: L.imageOverlay('Glorian.png', bounds, { opacity: 0 }),
    tunuva: L.imageOverlay('Tunuva.png', bounds, { opacity: 0 }),
    wulf: L.imageOverlay('Wulf.png', bounds, { opacity: 0 }),
    marosa: L.imageOverlay('Marosa.png', bounds, { opacity: 0 }),
    melaugo: L.imageOverlay('Melaugo.png', bounds, { opacity: 0 }),
    aubrecht: L.imageOverlay('Aubrecht.png', bounds, { opacity: 0 }),
    tane: L.imageOverlay('Tane.png', bounds, { opacity: 0 }),
    ead: L.imageOverlay('Ead.png', bounds, { opacity: 0 }),
    niclays: L.imageOverlay('Niclays.png', bounds, { opacity: 0 }),
    loth: L.imageOverlay('Loth.png', bounds, { opacity: 0 }),
};

/* ADD ROUTES TO MAP */
routes.dumai.addTo(map);
routes.glorian.addTo(map);
routes.tunuva.addTo(map);
routes.wulf.addTo(map);
routes.marosa.addTo(map);
routes.melaugo.addTo(map);
routes.aubrecht.addTo(map);
routes.tane.addTo(map);
routes.ead.addTo(map);
routes.niclays.addTo(map);
routes.loth.addTo(map);

/* 5. TOGGLE FUNCTION */
function toggleRoute(name) {

    const route = routes[name];

    const isVisible = route.options.opacity === 1;

    route.setOpacity(isVisible ? 0 : 1);

    updateButtonState(name, !isVisible);

}

/* 6. BUTTON STATE UI */
function updateButtonState(name, isActive) {
    const btn = document.getElementById(`btn-${name}`);

    if (!btn) return;

    if (isActive) {
        btn.classList.add("active");
    } else {
        btn.classList.remove("active");
    }
}

/* 7. TOGGLE SIDEBAR */
function toggleSidebar() {

    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');
    const mapEl = document.getElementById('map');

    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        mapEl.style.pointerEvents = 'none';
    } else {
        mapEl.style.pointerEvents = 'auto';
    }
}

/* 8. APPLY INITIAL VIEW */
function applyInitialView() {

    if (window.innerWidth <= 768) {

        map.setView(
            [mapHeight / 2, mapWidth * 0.2],
            -2
        );

        document.querySelector('.sidebar').classList.remove('open');

    } else {

        map.fitBounds(bounds, {
            padding: [20, 20]
        });
    }
}

/* 9. WINDOW.LOAD */
window.addEventListener("load", () => {
    updateButtonState("dumai", false);
    updateButtonState("glorian", false);
    updateButtonState("tunuva", false);
    updateButtonState("wulf", false);
    updateButtonState("marosa", false);
    updateButtonState("melaugo", false);
    updateButtonState("aubrecht", false);
    updateButtonState("tane", false);
    updateButtonState("ead", false);
    updateButtonState("niclays", false);
    updateButtonState("loth", false);
});

/* 10. MAP.WHENREADY */
map.whenReady(() => {
    setTimeout(() => {
        // optional intro animation later
    }, 300);
});

/* run once on load */
applyInitialView();

window.addEventListener("resize", applyInitialView);
