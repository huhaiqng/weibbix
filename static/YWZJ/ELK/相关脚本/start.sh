#!/bin/bash
if [ $# -eq 1 ]
then
	nohup ./logstash -f $1 >/dev/null 2>&1 &
else
	echo "example:sh start.sh example.conf"
fi
