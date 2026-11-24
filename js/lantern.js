const carousel = document.getElementById("carousel");
const panels = document.querySelectorAll(".panel");

const totalPanels = panels.length; // 6 mặt
const angleStep = 360 / totalPanels; // 60 độ mỗi mặt

// Tính bán kính để 6 mặt ghép khít tương đối thành vòng tròn
function getRadius() {
    const panelWidth = panels[0].offsetWidth;
    return Math.round((panelWidth / 2) / Math.tan(Math.PI / totalPanels)) + 24;
}

function layoutPanels() {
    const radius = getRadius();
    panels.forEach((panel, index) => {
        const angle = index * angleStep;
        panel.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
}

layoutPanels();
window.addEventListener("resize", layoutPanels);

let currentAngle = 0;
let isPaused = false;
const speedDegPerSec = 25; // Tốc độ quay (độ / giây)
let lastTime = performance.now();

function animate(now) {
    const dt = (now - lastTime) / 1000;
    lastTime = now;

    if (!isPaused) {
        currentAngle = (currentAngle + speedDegPerSec * dt) % 360;
        carousel.style.transform = `rotateY(${-currentAngle}deg)`;
    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Đưa chuột vào từng hình -> dừng quay; rê chuột ra -> quay tiếp
panels.forEach((panel) => {
    panel.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    panel.addEventListener("mouseleave", () => {
        isPaused = false;
        lastTime = performance.now(); // Tránh nhảy bước thời gian khi quay lại
    });
});