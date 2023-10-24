// Подключение функционала "Чертогов Фрилансера"
import { isMobile, menuInit, menuSublistsInit, _slideToggle, _slideDown, _slideUp } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';

import LocomotiveScroll from 'locomotive-scroll';

export let locomotiveScroll;

window.addEventListener('load', function () {
	setTimeout(function () {
		let lenisOptions;

		const userAgent = navigator.userAgent;

		if (userAgent.includes('Safari') && !userAgent.includes('Chrome') && !userAgent.includes('Opera')) {
			console.log('This is Safari');
			document.documentElement.classList.add('safari');
			lenisOptions = {
				wrapper: document.body,
				content: document.documentElement,
				lerp: 0.1,
				duration: 1.2,
				orientation: 'vertical',
				gestureOrientation: 'vertical',
				smoothWheel: true,
				smoothTouch: false,
				wheelMultiplier: 1,
				touchMultiplier: 1,
				normalizeWheel: true,
			};
		} else {
			console.log('This is not Safari - init smooth scrolling');
			lenisOptions = {
				wrapper: document.body,
				content: document.documentElement,
				lerp: 0.1,
				duration: 1.2,
				orientation: 'vertical',
				gestureOrientation: 'vertical',
				smoothWheel: true,
				smoothTouch: false,
				wheelMultiplier: 1,
				touchMultiplier: 1,
				normalizeWheel: true,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
			};
		}

		locomotiveScroll = new LocomotiveScroll({
			lenisOptions,
		});

		menuInit();
		menuSublistsInit();

		const benefitsImageItems = document.querySelectorAll('.item-benfits--with-image');
		if (benefitsImageItems.length) {
			benefitsImageItems.forEach((benefitsImageItem) => {
				const labelHeight = benefitsImageItem.querySelector('.item-benfits__label').offsetHeight;
				const textHeight = benefitsImageItem.querySelector('.item-benfits__inner-text').offsetHeight;
				const difference = textHeight - labelHeight;
				benefitsImageItem.style.setProperty('--text-offset', `${difference}px`);
			});
		}

		const isTouch = document.documentElement.classList.contains('touch');

		if (isTouch) {
			const benefitsBlock = document.querySelector('.benefits__body');

			if (benefitsBlock) {
				benefitsBlock.addEventListener('click', function (e) {
					let target = e.target.classList.contains('item-benfits') ? e.target : e.target.closest('.item-benfits');
					if (target) {
						target.classList.toggle('active');
					}
				});
			}
		} else {
			const benefitsButtons = document.querySelectorAll('.item-benfits');
			if (benefitsButtons.length) {
				benefitsButtons.forEach((currentItem) => {
					currentItem.addEventListener('mouseenter', function (e) {
						currentItem.classList.add('active');
					});
					currentItem.addEventListener('mouseleave', function (e) {
						currentItem.classList.remove('active');
					});
				});
			}
		}

		const windowHeight = window.innerHeight;

		const benefitsPage = document.querySelector('.page__benefits');
		if (benefitsPage) {
			const benefitsPageContent = document.querySelector('.benefits__sticky-inner');
			const benefitsPageHeight = benefitsPageContent.offsetHeight;
			if (benefitsPageHeight + 200 < windowHeight) {
				benefitsPage.dataset.sticky = '';
				console.log(benefitsPageHeight);
				console.log(windowHeight);
			}

			const portfolioPage = document.querySelector('.page__portfolio');
			const portfolioPageHeight = portfolioPage.offsetHeight - 210;

			if (window.innerWidth < 649 && portfolioPageHeight < windowHeight) {
				portfolioPage.dataset.sticky = '';
			}
		}

		//Porfolio page. Select list logic
		if (window.innerWidth < 870) {
			const portfolioNav = document.querySelector('.tabs-portfolio__navigation');

			if (portfolioNav) {
				const portfolioListItems = document.querySelectorAll('.tabs-portfolio__title');

				portfolioListItems.forEach((portfolioListItem) => {
					if (!portfolioListItem.classList.contains('_tab-active')) {
						_slideUp(portfolioListItem);
					}
				});

				portfolioNav.addEventListener('click', function (e) {
					setTimeout(() => {
						portfolioNav.classList.toggle('show-list');
						portfolioListItems.forEach((portfolioListItem) => {
							if (!portfolioListItem.classList.contains('_tab-active')) {
								if (!portfolioNav.classList.contains('show-list')) {
									_slideUp(portfolioListItem);
									// portfolioListItem.setAttribute('hidden', 'true');
								} else {
									_slideDown(portfolioListItem);
									// portfolioListItem.removeAttribute('hidden');
								}
							}
						});
					}, 100);
				});
			}
		}

		if (window.innerWidth > 900) {
			//Дублирование элементов в шапке
			let headerMenuItems = document.querySelectorAll('.menu__list>.menu__item');
			const stickyMenuList = document.querySelector('.sticky-header__items');

			headerMenuItems.forEach((element) => {
				let sublist = element.querySelector('.menu__sublist[hidden]');
				if (sublist) {
					sublist.removeAttribute('hidden');
				}
				if (element.classList.contains('menu__item--sublist')) {
					let icon = element.querySelector('.menu__icon-sublist');

					if (icon) {
						icon.innerHTML = `<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.16984 0.548828L5.99984 5.45053H3.16984H0.339844L3.16984 0.548828Z" fill="currentColor" />
                                    </svg>`;
					}
				}
				stickyMenuList.insertAdjacentElement('beforeend', element);
			});
		}
	}, 0);
});
