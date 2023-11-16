"use strict"
const GEO_LINK = 'https://maps.app.goo.gl/T4MzyWD7CYGcHX1M7?g_st=ic';
const MOVE_SIZE = 161;
const sideBarForm = document.getElementById('side-bar-form');
const modal = document.getElementById('modal-call4');

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
const serviceViews = [
    { img: 'DSC_3191.jpg', header: 'Діагностика та ремонт ходової' },
    { img: 'DSC_3095.jpg', header: 'Комплексна діагностика та ремонт двигуна'},
    { img: 'DSC_2937.jpg', header: 'Розвал-сходження 3D'},
    { img: 'DSC_3207.jpg', header: 'Заправка кондиціонера'},
    { img: 'DSC_3120.jpg', header: 'Ремонт та заміна гальмівної частини'},
    { img: 'DSC_3218.jpg', header: 'Продаж запчастин'},
    { img: 'DSC_2949.jpg', header: 'Діагностика авто перед покупкою'},
    { img: 'DSC_3092.jpg', header: 'Комп\'ютерна діагностика'},
    { img: 'DSC_3068.jpg', header: 'Заміна ГРМ'},
    { img: 'DSC_2967.jpg', header: 'Проточка гальмівних дисків'}
];

const workCarousel = document.getElementById('carousel-inner');

const carousel = document.getElementById('carousel');
const services = document.getElementById('serv-card');
const phone = '+380979034777';
let carouselLeftOffset = 0;
const toGoogleMaps = () => window.open(GEO_LINK, '_blank');
const toTelegram = () => window.open("https://t.me/olehAmerica")
const toCall = () => window.open(`tel:${phone}`)
const toInstagram = () => window.open('https://www.instagram.com/dacar_service.cv/', '_blank')
const openSideBar = () => sideBarForm.classList.add('opened');
const closeSideBar = () => sideBarForm.classList.remove('opened');

const openModal = () => modal.style.display = 'block';
const closeModal = () => modal.style.display = 'none';

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

const renderServices = () => {
    const servicesHtml = serviceViews.reduce((acc, view) => acc + buildServices(view.img, view.header), '');
    services.innerHTML = servicesHtml + services.innerHTML;
}

const buildServices = (img, header) => {
    return `<div class="serv-item white rel">
                <div class="st-bg">
                    <img src="./images/service-card/${img}" alt="${header}" loading="eager">
                </div>
                <div class="serv-item__cont col-vcenter">
                    <div class="serv-item__top col-vcenter">
                        <a class="serv-item__header t38 mb2 fwb">${header}</a>
                    </div>
                    <div class="serv-bot sb-center">
                        <div class="serv-bot__right col-center">
                            <div class="serv-bot__link white t16 row-vcenter">
                                <a class="serv-bot__link-img mrm">
                                    <img onclick="toTelegram()" src="./images/tg-ico.png" alt="">
                                </a>
                                <a onclick="toCall()" class="dotted white dotted_d phone-link">${phone}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}

const buildWorkCarouselItem = (img, header) => {
    return `<div class="carousel-item active">
                <img src="./images/service-card/${img}" alt="${header}" class="d-block w-100">
            </div>`
}
const renderWorksCarousel = () => {
    services.innerHTML = serviceViews.reduce((acc, view) => acc + buildWorkCarouselItem(view.img, view.header), '');
}

(function() {
    renderServices();
    //renderWorksCarousel();
    addEventListener("resize", () => resizeCarousel());
    renderCarousel();
    resizeCarousel();
})();

