#!/bin/bash

cd client

npm install

npm start &

cd ../server

npm install

node index.js