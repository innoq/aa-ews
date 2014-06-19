.PHONY: all dist resources

export PATH := ./node_modules/.bin:$(PATH)

all: resources dist

dist:
	mkdir -p dist
	`which browserify` -o dist/bundle.js lib/main.js

resources:
	mkdir -p resources
	node generate_resources.js resources
