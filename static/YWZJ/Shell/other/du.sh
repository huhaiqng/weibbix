#!/bin/bash
for dir in `ls /`
do
    if df | awk '{print $NF}' | grep ^[/] | awk -F '/' '{print $NF}' | sed '/^$/d' | grep $dir >/dev/null ; then
        echo "$dir is mounted"
    else
        du -sh /$dir | grep G
    fi
done
