.PHONY: dist

export PATH := ./node_modules/.bin:$(PATH)

dist:
	mkdir -p dist
	`which browserify` -o dist/bundle.js lib/main.js
