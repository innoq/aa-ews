/*jslint vars: true, node: true, white: true */
"use strict";

var $ = require("jquery");

exports.http = ajax;

// wrapper around `jQuery.ajax`, making return value Promises/A+ compatible
function ajax() {
	var deferred = $.ajax.apply($, arguments);
	return new Promise(deferred.then);
}
