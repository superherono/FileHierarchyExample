/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';

import {
	Navigation,
	EffectCards,
	EffectCreative
} from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
//import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
import 'swiper/css';



window.addEventListener("load", function (e) {
	function bildSliders() {
		//BildSlider
		let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
		if (sliders) {
			if (window.innerWidth < 649) {
				sliders.forEach(slider => {
					slider.parentElement.classList.add('swiper');
					slider.classList.add('swiper-wrapper');
					for (const slide of slider.children) {
						slide.classList.add('swiper-slide');
					}
				});
			} else {
				sliders.forEach(slider => {
					if (!slider.parentElement.classList.contains('portfolio__items')) {
						slider.parentElement.classList.add('swiper');
						slider.classList.add('swiper-wrapper');
						for (const slide of slider.children) {
							slide.classList.add('swiper-slide');
						}
					}
				});
			}

		}
	}

	// Инициализация слайдеров
	function initSliders() {
		// Перечень слайдеров
		// Проверяем, есть ли слайдер на стронице
		if (document.querySelector('.portfolio__items') && window.innerWidth < 649) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			new Swiper('.portfolio__items', { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				observer: true,
				observeParents: true,
				slidesPerView: 1.14,
				spaceBetween: 20,
				autoHeight: true,
				speed: 800,
			});
		}
		if (document.querySelector('.steps__slider')) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			new Swiper('.steps__slider', { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				modules: [Navigation],
				observer: true,
				observeParents: true,
				spaceBetween: 20,
				speed: 800,
				autoHeight: false,
				breakpoints: {
					320: {
						slidesPerView: 1.24,
					},
					760: {
						slidesPerView: 2.6,
					},
					960: {
						slidesPerView: 3,
					},
					// 1200: {
					// 	slidesPerView: 3.15,
					// },
				},
				navigation: {
					prevEl: '.steps__arrow.arrow-button--prev',
					nextEl: '.steps__arrow.arrow-button--next',
				},
				on: {
					init: (swiper) => {
						let captionBiggestHeight = 0;
						swiper.slides.forEach(slide => {
							let caption = slide.querySelector('.steps__caption');
							console.log(caption.clientHeight);
							if (caption.clientHeight > captionBiggestHeight) {
								captionBiggestHeight = caption.offsetHeight;
							}
						});
						swiper.slides.forEach(slide => {
							let caption = slide.querySelector('.steps__caption');
							caption.style.height = captionBiggestHeight + 'px';
						});
						console.log(captionBiggestHeight);
					}
				}
			});
		}
		if (document.querySelector('.hero-portfolio__slider')) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			// 1920 28 1440 18 960 18 768 14 360 14
			let heightOffset;
			let windowWidth = window.innerWidth;

			if (windowWidth < 768) {
				heightOffset = 14;
			} else if (windowWidth >= 768 && windowWidth <= 1600) {
				heightOffset = 18;
			} else {
				heightOffset = 28;
			}

			new Swiper('.hero-portfolio__slider', { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				modules: [Navigation, EffectCards, EffectCreative],
				// effect: "cards",
				// perSlideRotate: 45,

				effect: "creative",
				creativeEffect: {
					progressMultiplier: 1,
					limitProgress: 4,
					prev: {
						// shadow: true,
						// translate: ["-125%", 0, -800],
						translate: [0, 0, 0],
						rotate: [0, 0, 0],
					},
					next: {
						// shadow: true,
						translate: [0, -heightOffset, 0],
						rotate: [0, 0, 2],
					},
				},
				grabCursor: true,
				observer: true,
				observeParents: true,
				spaceBetween: 20,
				speed: 800,
				slidesPerView: 1,
				navigation: {
					prevEl: '.hero-portfolio__arrow.arrow-button--prev',
					nextEl: '.hero-portfolio__arrow.arrow-button--next',
				},
				on: {
					init: (swiper) => {

					}
				}
			});
		}
		if (document.querySelector('.objects-portfolio__slider')) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			new Swiper('.objects-portfolio__slider', { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				observer: true,
				observeParents: true,
				spaceBetween: 20,
				autoHeight: true,
				speed: 800,
				breakpoints: {
					320: {
						slidesPerView: 1.23,
					},
					650: {
						slidesPerView: 2.55,
					},
					900: {
						slidesPerView: 4,
					},
				}
			});
		}
		if (document.querySelector('.another-projects__slider')) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			new Swiper('.another-projects__slider', { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				modules: [Navigation],
				observer: true,
				observeParents: true,
				spaceBetween: 20,
				autoHeight: true,
				speed: 800,
				breakpoints: {
					320: {
						slidesPerView: 1.08,
					},
					650: {
						slidesPerView: 2,
					},
					900: {
						slidesPerView: 3,
					},
				},
				navigation: {
					prevEl: '.another-projects__arrow.arrow-button--prev',
					nextEl: '.another-projects__arrow.arrow-button--next',
				},
			});
		}
	}

	bildSliders();
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});