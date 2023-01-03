#!/bin/sh
mkdir -p dist
tsc --build tsconfig-cjs.json
tsc --build tsconfig-esm.json
echo '{"type": "module"}' > dist/esm/package.json