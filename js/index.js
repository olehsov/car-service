"use strict"

const sideBarForm = document.getElementById('side-bar-form');
const modal = document.getElementById('modal-call4');
const checkPriceButton = document.getElementById('check-price');
const checkPriceModalButton = document.getElementById('check-price-modal');

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
const carouselImages = [
    'DSC_2860.jpg',
    'DSC_2926.jpg',
    'DSC_2947.jpg',
    'DSC_2952.jpg',
    'DSC_2967.jpg',
    'DSC_3023.jpg',
    'DSC_3038.jpg',
    'DSC_3057.jpg',
    'DSC_3095.jpg',
    'DSC_3101.jpg',
    'DSC_3108.jpg',
    'DSC_3159.jpg',
    'DSC_3168.jpg',
    'DSC_3178.jpg',
    'DSC_3190.jpg',
    'DSC_3208.jpg',
    'DSC_3218.jpg',
    'DSC_3219.jpg',
    'DSC_3223.jpg',
    'DSC_3230.jpg',
    'DSC_3253.jpg',
    'DSC_3266.jpg',
    'DSC_3269.jpg'
]

const workCarousel = document.getElementById('carousel-inner');

const carousel = document.getElementById('carousel');
const services = document.getElementById('serv-card');
let carouselLeftOffset = 0;
const toGoogleMaps = () => window.open(GEO_LINK, '_blank');
const toTelegram = () => window.open(`https://t.me/DaCarServicecv`)
const toCall = () => window.open(`tel:${PHONE}`)
const toInstagram = () => window.open('https://www.instagram.com/dacar_service.cv/', '_blank')
const openSideBar = () => sideBarForm.classList.add('opened');
const closeSideBar = () => sideBarForm.classList.remove('opened');

const openModal = () => modal.style.display = 'block';
const closeModal = () => modal.style.display = 'none';

const scrollToTop = () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0,0);
};

const renderCarousel = () =>
    carousel.innerHTML = marLogos.map(buildCarCard).reduce((accumulator, card) => accumulator + card, '');

const buildCarCard = (img, idx) => {
    return `<a class="custom-carousel-item" data-index="${idx}" aria-hidden="false" tabindex="0">
                <div class="custom-carousel-img">
                    <img src="./images/carousel-mark/${img}" alt="${img.replace('.png', '')}">
                </div>
            </a>`
};

const carouselItemNumber = () => Math.floor((innerWidth - 50) * 0.75 / MOVE_SIZE);
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
    services.innerHTML = serviceViews.reduce(
        (acc, view) => acc + buildServices(view.img, view.header),
        ''
    );
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
                </div>
            </div>`
}

const buildWorkCarouselItem = (image, active) => {
    return `<div class="carousel-item ${!active ? 'active' : ''}">
                <img
                 class="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                 width="800"
                 height="400"
                 src="./images/carousel/${image}"
                 alt="${image}"
                 class="d-block w-100"
                >
            </div>`
}
const renderWorksCarousel = () => {
    workCarousel.innerHTML = carouselImages.reduce((acc, image, idx) => acc + buildWorkCarouselItem(image, idx), '');
}

const sendMessage = async (phone, name) => {
    let text = `Прийшов запит з телефона: ${phone}`;
    if (name) text += `(${name})`;

    try {
        const response = await fetch(`${TELEGRAM_URL}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
        });

        const result = await response.json();
        console.log('Message sent:', result);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

(function() {
    renderServices();
    renderWorksCarousel();
    addEventListener("resize", () => resizeCarousel());
    renderCarousel();
    resizeCarousel();

    checkPriceButton.addEventListener('click', async $event => {
        $event.preventDefault();
        $event.stopPropagation();

        const userPhone = document.getElementById('user-phone').value;
        const userName = document.getElementById('user-name').value;

        await sendMessage(userPhone, userName)
    })

    checkPriceModalButton.addEventListener('click', async $event => {
        $event.preventDefault();
        $event.stopPropagation();

        const userPhone = document.getElementById('modal-user-phone').value;
        await sendMessage(userPhone)
    })
})();

function changeTitle(element, title) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.getElementById('side-text-header').innerText = String.prototype.toUpperCase.call(title);
            }
        });
    }, { threshold: 0.5 }); // Adjust the threshold as needed

    observer.observe(element);
}

// Usage
document.addEventListener("DOMContentLoaded", function() {
    const elementsToObserve = Array.from(document.getElementsByTagName('h2')); // Change this selector to target your specific element
    elementsToObserve.forEach(elementToObserve => changeTitle(elementToObserve, elementToObserve.getAttribute('data-title')));
});

