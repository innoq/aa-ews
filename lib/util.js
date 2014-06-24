/*jslint vars: true, node: true, white: true */
"use strict";

var $ = require("jquery");

exports.http = ajax;

// wrapper around `jQuery.ajax`, making return value Promises/A+ compatible
function ajax() {
	var args = arguments;
	return new Promise(function(resolve, reject) {
		$.ajax.apply($, args).done(function(data, status, xhr) {
			resolve({ data: data, xhr: xhr });
		}).fail(function(xhr, status, error) {
			reject(new Error("failed to retrieve URI"));
		});
	});
}
