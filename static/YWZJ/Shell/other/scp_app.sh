#!/bin/bash
deploydir=/data/vsftpd

if [ $# -ne 1 ] ; then
    echo "example: sh scp_app.sh filename"
    exit
fi

if ssh 10.10.4.111 test -e /home/applog/$1 
then
    echo "$1 exist in dir /home/applog"
    [ -f $deploydir/$1  ] && mv $deploydir/$1 $deploydir/$1.`date "+%Y%m%d%H%M%S"`
    scp 10.10.4.111:/home/applog/$1 $deploydir
elif ssh 10.10.4.111 test -e /appdir/deploy/$1 
then
    echo "$1 exsist in dir /appdir/deploy"
    [ -f $deploydir/$1  ] && mv $deploydir/$1 $deploydir/$1.`date "+%Y%m%d%H%M%S"`
    scp 10.10.4.111:/appdir/deploy/$1 $deploydir
else
    echo "$1 not exist!!!"
fi

find $deploydir -type f -cmin -1  
