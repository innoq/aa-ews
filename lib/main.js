/*jslint vars: true, node: true, white: true */
"use strict";

global.setImmediate = setTimeout; // required for Promiscuous -- XXX: workaround

var Promise = require("promiscuous");
var $ = require("jquery");
require("pjax");
require("select2");
var applyFilter = require("./filter");
var injectAvatars = require("./avatars");

var doc = $(document.body);

doc.pjax("a", "#contents", { fragment: "#contents" });
doc.on("pjax:end", function(ev) {
	initWidgets(ev.target);
});
initWidgets();

function initWidgets(context) {
	$(".roster", context).each(function(i, node) {
		var filter = $('<input type="text" class="controls" />').
			attr("placeholder", "e.g. Martin Mayer").insertBefore(node);
		applyFilter(filter);
	});

	injectAvatars(context);
}
