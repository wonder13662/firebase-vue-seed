#!/bin/bash
kill -9 $(lsof -i:5001 -t) 2> /dev/null
kill -9 $(lsof -i:8081 -t) 2> /dev/null
kill -9 $(lsof -i:500 -t) 2> /dev/null
