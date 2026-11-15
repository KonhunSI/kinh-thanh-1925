#!/usr/bin/env bash
# Đóng gói Firebase (đăng nhập + Firestore Lite) thành src/static/fb.js.
# Cần: npm i --no-save firebase@13.1.0 esbuild@0.25.10  (hoặc đặt NODE_PATH tới node_modules có sẵn)
set -euo pipefail
cd "$(dirname "$0")/.."
npx esbuild src/fb/entry.js --bundle --format=esm --minify --target=es2020 \
  --legal-comments=none --outfile=src/static/fb.js
