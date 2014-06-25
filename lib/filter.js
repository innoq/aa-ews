/*jslint vars: true, node: true, white: true */
"use strict";

var $ = require("jquery");
var util = require("./util");

module.exports = function(el) {
	return el.select2({
		minimumInputLength: 3,
		query: onQuery
	}).on("change", function(ev) {
		document.location = ev.val + ".html"; // XXX: hard-coded
	});
};

function onQuery(query) {
	var data = { results: [] };
	retrieveMatches(query.term).then(function(res) {
		data.results = res.map(function(member) {
			return { id: member.handle, text: member.name };
		});
		query.callback(data);
	});
}

function retrieveMatches(query) {
	query = query.toLowerCase();
	return util.http("roster.json").then(function(res) { // XXX: hard-coded
		return res.filter(function(member) {
			return member.name.toLowerCase().indexOf(query) !== -1;
		});
	});
}
