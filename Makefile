.PHONY: all dist resources

export PATH := ./node_modules/.bin:$(PATH)

all: resources dist

watch: dist
	`which watchify` -v -o dist/bundle.js lib/main.js

dist:
	mkdir -p dist
	`which browserify` -o dist/bundle.js lib/main.js

resources:
	mkdir -p resources
	node generate_resources.js resources
