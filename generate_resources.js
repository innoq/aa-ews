/*jslint vars: true, node: true, white: true */
"use strict";

var fs = require("fs");
var nunjucks = require("nunjucks");

nunjucks.configure("templates", { autoescape: true });

var targetDir = process.argv[2]; // ignore Node command and script file
var assetPrefix = "../"; // XXX: hard-coded

var title = "AA EWS";
var members = [{
	name: "Jonathan Koch",
	age: 28,
	sobriety: "248 days",
	awards: "♙"
}, {
	name: "Marc Emmerich",
	sobriety: "12 days",
	atRisk: true
}, {
	name: "Peter Weiland",
	sobriety: "8 years",
	awards: "♖ ♗ ♙"
}, {
	name: "Hannah Schumacher",
	sobriety: "2 years",
	awards: "♗ ♙",
	atRisk: true
}, {
	name: "Herbert Junger",
	age: 56,
	sobriety: "14 years",
	awards: "♔ ♘ ♙"
}];

members.forEach(function(member) {
	member.handle = member.name.split(" ").map(function(name) {
		return name[0].toLowerCase();
	}).join("");
	render("member.html", member.handle + ".html", {
		assetPrefix: assetPrefix,
		title: title,
		member: member
	});
});

render("roster.html", "index.html", {
	assetPrefix: assetPrefix,
	title: title,
	members: members
});
fs.writeFile([targetDir, "roster.json"].join("/"), JSON.stringify(members),
		onWrite);

function render(template, filename, data) {
	var page = nunjucks.render(template, data);
	fs.writeFile([targetDir, filename].join("/"), page, onWrite);
}

function onWrite(err) {
	if(err) {
		console.error("error writing file:", err.path);
	}
}
