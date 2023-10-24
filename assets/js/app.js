/* Enable/disable FLS (Full Logging System) (in operation) */
window['FLS'] = false;

/* Connecting the main styles file */
import "../scss/style.scss";


import * as flsFunctions from "./files/functions.js";

/* Popups */
import './libs/popup.js'

/* Form functions */
import * as flsForms from "./files/forms/forms.js";

/* Module for custom select. */
import './libs/select.js'

/* Mask module.
/* Connection and configuration is done in the file js/files/forms/inputmask.js */
import "./files/forms/inputmask.js";


/* Object watcher with data-watch attribute */
import './libs/watcher.js'

/* Scroll functions */
import * as flsScroll from "./files/scroll/scroll.js";


/* Dynamic Adaptive */
import "./libs/dynamic_adapt.js";


/* Custom code */
import "./files/script.js";

/* Checking for webp support, adding a webp or no-webp class for HTML */
/* (i) necessary to display webp from css correctly */
flsFunctions.isWebp();

/* Sticky header */
flsScroll.headerScroll();


window.addEventListener("load", function () {

	setTimeout(function () {
		/* Forms fields validation */
		flsForms.formFieldsInit({
			viewPass: false,
			autoHeight: false
		});
		/* Sending forms */
		flsForms.formSubmit();

		/* Page navigation */
		flsScroll.pageNavigation();

		/* Mobile Menu */
		flsFunctions.menuInit();

		/* Spolers */
		flsFunctions.spollers();
	}, 0);
});