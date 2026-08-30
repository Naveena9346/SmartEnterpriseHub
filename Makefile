.PHONY: all setup build dev test clean

all: setup build

setup:
	npm run setup

build:
	npm run build

dev:
	npm run dev

test:
	npm run test

clean:
	rm -rf backend/dist frontend/dist coverage
