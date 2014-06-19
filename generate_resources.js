var fs = require("fs");
var nunjucks = require("nunjucks");

nunjucks.configure("templates", { autoescape: true });

var targetDir = process.argv[2]; // ignore Node command and script file
var assetPrefix = "../"; // XXX: hard-coded

var title = "AA EWS";
var members = [{
	handle: "jk",
	name: "Jonathan Koch",
	age: 28,
	sobriety: "248 days",
	awards: "♙"
}, {
	handle: "me",
	name: "Marc Emmerich",
	sobriety: "12 days",
	atRisk: true
}, {
	handle: "pw",
	name: "Peter Weiland",
	sobriety: "8 years",
	awards: "♖ ♗ ♙"
}, {
	handle: "hs",
	name: "Hannah Schumacher",
	sobriety: "2 years",
	awards: "♗ ♙",
	atRisk: true
}, {
	handle: "hj",
	name: "Herbert Junger",
	age: 56,
	sobriety: "14 years",
	awards: "♔ ♘ ♙"
}];

render("roster.html", "index.html", {
	assetPrefix: assetPrefix,
	title: title,
	members: members
});

members.forEach(function(member) {
	render("member.html", member.handle + ".html", {
		assetPrefix: assetPrefix,
		title: title,
		member: member
	});
});

function render(template, filename, data) {
	var page = nunjucks.render(template, data);
	fs.writeFile([targetDir, filename].join("/"), page, onWrite);
}

function onWrite(err) {
	if(err) {
		console.error("error writing file:", err.path);
	}
}
