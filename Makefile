BUILD:=build
all: $(BUILD)/.docker.built

$(BUILD)/.docker.built: emscripten/Dockerfile
	docker build --rm --force-rm -t emscripten `dirname $<`
	touch $@

