
import {
	isMobile,
	getHash
} from "../functions.js";

import {
	gotoBlock
	
} from "./gotoblock.js";

let addWindowScrollEvent = false;

export function pageNavigation() {

	document.addEventListener("click", pageNavigationAction);

	document.addEventListener("watcherCallback", pageNavigationAction);

	function pageNavigationAction(e) {
		if (e.type === "click") {
			const targetElement = e.target;
			if (targetElement.closest('[data-goto]')) {
				const gotoLink = targetElement.closest('[data-goto]');
				const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
				const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
				const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
				gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
				e.preventDefault();
			}
		} else if (e.type === "watcherCallback" && e.detail) {
			const entry = e.detail.entry;
			const targetElement = entry.target;

			if (targetElement.dataset.watch === 'navigator') {
				const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
				let navigatorCurrentItem;
				if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
					navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
				} else if (targetElement.classList.length) {
					for (let index = 0; index < targetElement.classList.length; index++) {
						const element = targetElement.classList[index];
						if (document.querySelector(`[data-goto=".${element}"]`)) {
							navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
							break;
						}
					}
				}
				if (entry.isIntersecting) {
					navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
				} else {
					navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
				}
			}
		}
	}

	if (getHash()) {
		let goToHash;
		if (document.querySelector(`#${getHash()}`)) {
			goToHash = `#${getHash()}`;
		} else if (document.querySelector(`.${getHash()}`)) {
			goToHash = `.${getHash()}`;
		}
		goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
	}
}

export function headerScroll() {
	addWindowScrollEvent = true;
	const header = document.querySelector('header.header');
	const headerShow = header.hasAttribute('data-scroll-show');
	const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
	const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
	const wrapper = document.querySelector('.wrapper');
	const categoriesMenu = document.querySelector('.news-block__categories');
	let scrollDirection = 0;
	let timer;
	let checker = false;
	document.addEventListener("windowScroll", function (e) {
		const scrollTop = window.scrollY;
		clearTimeout(timer);
		if (scrollTop >= startPoint) {
			!header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
			if (headerShow) {
				if (scrollTop > scrollDirection) {

					header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
					wrapper.classList.contains('_header-show') ? wrapper.classList.remove('_header-show') : null;
					if (categoriesMenu) {
						categoriesMenu.style.top = '0';
					}
					checker = false;
				} else {
					if (checker) {
						// upscroll code
						!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
						!wrapper.classList.contains('_header-show') ? wrapper.classList.add('_header-show') : null;
						if (categoriesMenu) {
							categoriesMenu.style.top = `${header.offsetHeight - 2}px`;
						}
					} else {
						setTimeout(() => {
							checker = true;
						}, 0);
					}

				}
			}
		} else {
			header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
			if (headerShow) {
				header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
				wrapper.classList.contains('_header-show') ? wrapper.classList.remove('_header-show') : null;
				if (categoriesMenu) {
					categoriesMenu.style.top = '0';
				}
			}
		}

		scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
	});
}

setTimeout(() => {
	if (addWindowScrollEvent) {
		let windowScroll = new Event("windowScroll");
		window.addEventListener("scroll", function (e) {
			document.dispatchEvent(windowScroll);
		});
	}
}, 0);