#!/bin/bash
if [ $# -ne 1 ] ;then
    exit
fi
user=`whoami`
if ps -ef | grep nodeagent | grep $user | grep java | grep -v grep >/dev/null; then
    psnum=`ps -ef | grep $1 | grep $user | grep java | grep -v grep | awk '$1 == user && $NF == server {print $2}' user=$user server=$1 | wc -l`
    if [ $psnum -eq 1 ] ; then
        psid=`ps -ef | grep $1 | grep $user | grep java | grep -v grep | awk '$1 == user && $NF == server {print $2}' user=$user server=$1`
        kill -9 $psid
    elif [ $psnum -eq 0 ] ; then
        case $user in 
	was1)
            /wasprofiles/c01-`hostname`/bin/startServer.sh $1
        ;;
        was2)
            /wasprofiles/c02-`hostname`/bin/startServer.sh $1
        ;;
        esac
    fi
else
    exit 0
fi
