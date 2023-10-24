import {
	flsModules
} from "../modules.js";

import "inputmask/dist/inputmask.min.js";

window.addEventListener("load", function () {
	setTimeout(function () {
		const inputMasks = document.querySelectorAll('.js-phone');

		if (inputMasks.length) {
			flsModules.inputmask = Inputmask().mask(inputMasks);
		}
	}, 0);
});