"use strict"
const GEO_LINK = 'https://www.google.co.uk/maps/place/%D1%83%D0%BB.+%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%BD%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F,+8,+%D0%9A%D0%B8%D0%B5%D0%B2,+%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0,+02000/@50.4999716,30.4774164,16.69z/data=!4m6!3m5!1s0x40d4d20abd19fd83:0x22ef7fa2c6e81bf6!8m2!3d50.5002946!4d30.4824313!16s%2Fg%2F11c17y6jwp?entry=ttu';
const MOVE_SIZE = 161;
const sideBarForm = document.getElementById('side-bar-form');

const marLogos = [
    'audi_logo.png',
    'bmw_logo.png',
    'citroen_logo-1.png',
    'jaguar_logo.png',
    'land_rover_logo.png',
    'mercedes_logo.png',
    'mitsubishi_logo.png',
    'nissan_logo.png',
    'opel_logo.png',
    'peugeot_logo.png',
    'renault_logo.png',
    'skoda_logo.png',
    'suzuki_logo-1.png',
    'toyota_logo.png',
    'volkswagen_logo.png',
    'volvo_logo-1.png'
];
const carousel = document.getElementById('carousel');

let carouselLeftOffset = 0;
const toGoogleMaps = () => window.open(GEO_LINK, '_blank');
const openSideBar = () => sideBarForm.classList.add('opened');
const closeSideBar = () => sideBarForm.classList.remove('opened');

const renderCarousel = () =>
    carousel.innerHTML = marLogos.map(buildCarCard).reduce((accumulator, card) => accumulator + card, '');

const buildCarCard = (img, idx) => {
    return `<a class="custom-carousel-item" data-index="${idx}" aria-hidden="false" tabindex="0">
                <div class="custom-carousel-img">
                    <img src="./images/carousel/${img}" alt="${img.replace('.png', '')}">
                </div>
            </a>`
};

const carouselItemNumber = () => Math.floor(innerWidth * 0.75 / MOVE_SIZE);
const updateCarouselOffset = () => carousel.style.transform = `translate3d(${carouselLeftOffset}px, 0px, 0px)`

const carouselPrevious = () => {
    if (carouselLeftOffset === 0) return;
    carouselLeftOffset += MOVE_SIZE;
    updateCarouselOffset();
};
const carouselNext = () => {
    const pressNext = Math.abs(carouselLeftOffset / MOVE_SIZE);
    if (marLogos.length - carouselItemNumber() <= pressNext) return;
    carouselLeftOffset -= MOVE_SIZE;
    updateCarouselOffset();
};

const resizeCarousel = () => {
    carouselLeftOffset = 0;
    updateCarouselOffset();
    const carouselWith = `${carouselItemNumber() * MOVE_SIZE}px`;
    const supportMarksContainer = document.getElementById('support-marks-container');
    supportMarksContainer.style.maxWidth = carouselWith;
}

(function() {
    addEventListener("resize", () => resizeCarousel());
    renderCarousel();
    resizeCarousel();
})();

