/*jslint vars: true, node: true, white: true */
"use strict";

var $ = require("jquery");

// `selector` references elements triggering embedded loading
// (e.g. "a.embeddable")
// `container` is a reference to the container the preview is loaded into
// `context` is an optional DOM reference limiting the `selector`'s scope
module.exports = function(selector, container, context) {
	container = container.jquery ? container : $(container);
	context = context || document.body;
	context = context.jquery ? context : $(context);
	context.on("click", selector, function(ev) {
		onClick.call(this, ev, container);
	});
};

function onClick(ev, container) {
	var uri = $(this).attr("href");
	if(uri) {
		populate(container, uri);
		ev.preventDefault();
	}
}

function populate(container, uri) {
	container.load(uri + " #contents", function() { // XXX: hard-coded selector
		$("html, body").animate({ scrollTop: container.offset().top }, 500);
	});
}
