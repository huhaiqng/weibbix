#!/bin/bash
rm -f size2.txt
while read line
do
    if echo $line | grep SUCCESS >/dev/null ; then
        ipaddr=`echo $line | awk '{print $1}'`
    else
        echo "$ipaddr	$line">>size2.txt
    fi
done < was2.txt
