# !/bin/bash

if [ "$NODE_ENV" == "production" ]; then
  npm install --include=dev
  npm run build

elif [ "$NODE_ENV" == "staging" ]; then
  npm run build

else
  npm run build
fi
