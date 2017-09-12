FROM ubuntu:16.04

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        cmake \
        python \
        nodejs \
        default-jre \
        git-core \
        curl && \
    curl https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz | tar -zx
RUN cd /emsdk-portable && \
    ./emsdk update && \
    ./emsdk install latest && \
    ./emsdk activate latest
WORKDIR /src
ENV EM_CACHE=/src/.emscripten_cache
