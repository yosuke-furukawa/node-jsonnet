#
# Directories
BUILD:=build
DIST:=lib
CPP_DIR:=cpp_src

#
# Files
JS_OUT:=libjsonnet.js
# This file gets included into the Emscripten compile of libjsonnet
POST_JS=jsonnet_emcc_pre.js
DOCKER_BUILT:=$(BUILD)/.docker.built

# Running the emscripten container
RUN_EM_CTR:=docker run --rm -it -v"$${PWD}:/src" emscripten

CLEANS:=$(BUILD) $(DIST)/$(JS_OUT) $(CPP_DIR)/$(JS_OUT)

.PHONY: all
all: $(DIST)/$(JS_OUT)

$(DIST)/$(JS_OUT): $(DOCKER_BUILT) Makefile $(CPP_DIR)/Makefile
	# Run the jsonnet project Makefile that builds the .js
	# Note that make is run in a subdir, so access to the POST_JS file
	# needs ../
	$(RUN_EM_CTR) /bin/bash -c ". /emsdk-portable/emsdk_env.sh && make -C $(CPP_DIR) POST_JS=../$(POST_JS) $(JS_OUT)"
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
	$(RUN_EM_CTR) make -C $(CPP_DIR) clean
	rm -rf $(CLEANS)

.PHONY: publish
publish: all
	npm publish --access=public
