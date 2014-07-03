/*jslint vars: true, node: true, white: true */
"use strict";

var $ = require("jquery");
require("bootstrap");

// `selector` references elements triggering embedded loading
// (e.g. "a.embeddable")
// `context` is an optional DOM reference limiting the `selector`'s scope
module.exports = function(selector, context) {
	context = context || document.body;
	context = context.jquery ? context : $(context);
	context.on("click", selector, onClick);
};

function onClick(ev) {
	var uri = $(this).attr("href");
	if(uri) {
		var dialog = createDialog().appendTo(document.body);
		dialog.find(".modal-body").load(uri + " #contents", function() { // XXX: hard-coded selector
			dialog.modal();
		});
		ev.preventDefault();
	}
}

function createDialog() {
	var container = $('<div class="modal fade" />');
	var dialog = $('<div class="modal-dialog" />').appendTo(container);
	var content = $('<div class="modal-content" />').appendTo(dialog);
	var body = $('<div class="modal-body" />').appendTo(content);
	return container;
}
