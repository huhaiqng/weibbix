#!/bin/bash
rm -f newcron.txt
n=`wc -l cron.txt | awk '{print $1}'`
for ((i=1;i<=$n;i++))
do
	ip="sed -n $[i]p washost.txt"
        $ip
        cron="sed -n $[i]p cron.txt"
	$cron
	echo "`$ip`:	`$cron`">>newcron.txt
done 
