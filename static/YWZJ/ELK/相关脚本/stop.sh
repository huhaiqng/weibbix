#!/bin/bash
if [ $# -eq 1 ]
then
	ps -ef | grep elk| grep [j]ava | grep $1 | awk '{print $2}' | xargs kill -9 
else
	echo "example:sh stop.sh example.conf"
fi
