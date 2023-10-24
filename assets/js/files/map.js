//Получить координаты:
//http://dimik.github.io/ymaps/examples/location-tool/

//LazyMap

function init() {
	let center = [55.649154, 37.881147];
	let map = new ymaps.Map('map', {
		center: center,
		zoom: 16,
	});
	let placemark = new ymaps.Placemark(center, {
		// balloonContent: 'г. Ростов-на-Дону, ул. 26 Линия, 11',
	}, {
		iconLayout: 'default#image',
		// iconCaption: 'г. Ростов-на-Дону, ул. 26 Линия, 11',
		// iconImageHref: 'img/icons/pin.svg',
		// iconImageSize: [80, 80],
		// iconImageOffset: [-19, -84],
		// preset: 'islands#redHomeIcon'

	});

	map.controls.remove('geolocationControl'); // удаляем геолокацию
	map.controls.remove('searchControl'); // удаляем поиск
	map.controls.remove('trafficControl'); // удаляем контроль трафика
	map.controls.remove('typeSelector'); // удаляем тип
	map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	map.controls.remove('zoomControl'); // удаляем контрол зуммирования
	map.controls.remove('rulerControl'); // удаляем контрол правил
	map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
	map.geoObjects.add(placemark);
}

function initYandexMap() {
	if (window.yandexMapDidInit) {
		return false;
	}
	window.yandexMapDidInit = true;

	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;

	script.src = 'https://api-maps.yandex.ru/2.1/?apikey=a9c8f6b4-0344-428b-a80a-969b0501ea50&lang=ru_RU';

	const map = document.getElementById("map");

	if (map) {
		map.appendChild(script);
	}

	initMap();
}

function initMap() {
	if (window.ymaps) {
		ymaps.ready(init);
	} else {
		setTimeout(() => {
			initMap();
		}, 500);
	}
}


let psLoadedJs = false
const getExtJs = () => {
	// проверяем, была ли выполнена функция ранее
	if (!psLoadedJs) {
		psLoadedJs = true
		// при выполенении функций удаляем события, которые были навешаны ранее.
		window.removeEventListener("scroll", getExtJs, false)
		window.removeEventListener("touchstart", getExtJs, false)
		window.removeEventListener("mousemove", getExtJs, false)
		window.removeEventListener("click", getExtJs, false)
		window.removeEventListener("keydown", getExtJs, false)
		clearTimeout(getExtJsTimeout)
		setTimeout(() => {
			initYandexMap()
		}, 300)
		// Для каждого скрипта нужно подбирать время, чтобы предыдущий успевал загрузиться и инициализироваться.
	}
}
// Вешаем выполнение функцию на каждое необходимое событие. Здесь перечислены самые распространенные.
window.addEventListener("load", function () {
	setTimeout(function () {
		if (document.querySelector('.map')) {
			window.addEventListener("scroll", getExtJs, {
				passive: true
			})
			window.addEventListener("touchstart", getExtJs, {
				passive: true
			})
			window.addEventListener("mousemove", getExtJs, {
				passive: true
			})
			window.addEventListener("click", getExtJs, {
				passive: true
			})
			window.addEventListener("keydown", getExtJs, {
				passive: true
			})
		}
	}, 0);
});
// Если никакое событие не произошло, то выполняем функцию через 5 секунд
let getExtJsTimeout = setTimeout(getExtJs, 5000)