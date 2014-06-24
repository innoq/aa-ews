/*jslint vars: true, node: true, white: true */
"use strict";

global.setImmediate = setTimeout; // required for Promiscuous -- XXX: workaround

var Promise = require("promiscuous");
var $ = require("jquery");
require("pjax");
var injectAvatars = require("./avatars");

var doc = $(document.body);

doc.pjax("a", "#contents", { fragment: "#contents" });
initWidgets();
doc.on("pjax:end", function(ev) {
	initWidgets(ev.target);
});

function initWidgets(context) {
	injectAvatars(context);
}
