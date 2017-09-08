#
# Directories
BUILD:=build
DIST:=lib
CPP_DIR:=cpp_src

#
# Files
JS_OUT:=libjsonnet.js
DOCKER_BUILT:=$(BUILD)/.docker.built

CLEANS:=$(BUILD) $(DIST)/$(JS_OUT) $(CPP_DIR)/$(JS_OUT)

.PHONY: all
all: $(DIST)/$(JS_OUT)

$(DIST)/$(JS_OUT): $(DOCKER_BUILT) Makefile $(CPP_DIR)/Makefile
	# Run the jsonnet project Makefile that builds the .js
	docker run --rm -it -v"$${PWD}:/src" emscripten /bin/bash -c ". /emsdk-portable/emsdk_env.sh && make -C $(CPP_DIR) $(JS_OUT)"
	cp $(CPP_DIR)/$(JS_OUT) $(DIST)/$(JS_OUT)

$(CPP_DIR)/Makefile:
	git submodule update --init --recursive

$(BUILD):
	mkdir $@

$(DOCKER_BUILT): emscripten/Dockerfile $(BUILD)
	docker build --rm --force-rm -t emscripten `dirname $<`
	touch $@

.PHONY: clean
clean:
	rm -rf $(CLEANS)

.PHONY: publish
publish: all
	npm publish --access=public
