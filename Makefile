clean:
	-rm -rf build

build:
	docker build --tag ghcr.io/teampui/nsmh-web-preact:latest .

push:
	docker push ghcr.io/teampui/nsmh-web-preact:latest

.PHONY: build push
