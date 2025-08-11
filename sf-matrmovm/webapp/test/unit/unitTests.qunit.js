/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"leco/sfmatrmovm/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
