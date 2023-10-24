/* Маски для полей (в работе) */

// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей
import { flsModules } from "../modules.js";

// Подключение модуля
import "inputmask/dist/inputmask.min.js";

const inputMasks = document.querySelectorAll('.js-phone');
if (inputMasks.length) {
	flsModules.inputmask = Inputmask(
		'+1 (011) 999 9999', {
			clearIncomplete: true,
			clearMaskOnLostFocus: true,
		}).mask(inputMasks);
}