#!/bin/bash
i=1
while true
do
    test=`nmap mapi.alipay.com -p 443 | grep https | grep -v grep`
    echo "$i $test"
    i=`expr $i + 1`
    sleep 1
done
