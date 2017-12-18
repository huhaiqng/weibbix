#!/bin/bash

user=`whoami`

if [ $user = "was1" ] ; then
    cd /wasprofiles/c01-`hostname`
elif [ $user = "was2" ] ; then
    cd /wasprofiles/c02-`hostname`
else
    echo "User must was1 or was2!"
    exit
fi

if ls | grep ^core.[0-9][[:digit:]]*$ >/dev/null; then
    cores=`ls | grep ^core.[0-9][[:digit:]]*$`
    for core in ${cores[@]}
    do
        filesize=`ls -l $core | awk '{print $5}'`
        filesizeG=`ls -lh $core | awk '{print $5}'`
        if [ $filesize -gt 1073741824 ] ; then
            [[ -f $core ]] && echo "$core is file, filesize is $filesizeG" 
        fi
    done
fi
