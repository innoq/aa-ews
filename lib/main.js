/*jslint vars: true, node: true, white: true */
"use strict";

var $ = require("jquery");

var pjaxContainer = $("#contents");
$("a.pjax").click(resolveLink);

function resolveLink(ev) {
	var link = $(this);
	var uri = link.attr("href");
	$("<div />").load(uri, function(html) {
		var contents = $(this).children();
		pjaxContainer.empty().append(contents);
	});
	ev.preventDefault();
}
