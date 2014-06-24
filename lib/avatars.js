/*jslint vars: true, node: true, white: true */
"use strict";

var $ = require("jquery");
var util = require("./util");

module.exports = injectAvatars;

function injectAvatars(context) {
	$(".h-card", context).each(function(i, node) {
		var id = $(".p-nickname", node).text();
		var name = $(".p-name", node).text();
		var uri = "../img/" + id + ".jpg"; // XXX: hacky and brittle
		var img = $('<img class="u-photo" />').attr("alt", name);
		util.http(uri).then(function(res) {
			img.attr("src", uri);
		}).catch(function(res) { // use default
			img.attr("src", "../img/unknown.jpg"); // XXX: hard-coded
		}).then(function() {
			img.prependTo(node);
		});
	});
}
