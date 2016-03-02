#!/bin/sh
node ./app.js &
./node_modules/jasmine-node/bin/jasmine-node ./spec/ --junitreport --output ./reports/
