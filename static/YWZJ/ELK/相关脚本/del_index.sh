#!/bin/bash
dt=`date +"%Y.%m.%d" -d'-14 day'`
curl -XDELETE "http://10.10.45.200:8201/*-$dt"
cat /dev/null > /usr/local/elk/elklog/apachelog/log0/ro.mangocity.com-access_log
cat /dev/null > /usr/local/elk/elklog/apachelog/log1/ro.mangocity.com-access_log
cat /dev/null > /usr/local/elk/elklog/apachelog/log0/www.mangocity.com-access_log
cat /dev/null > /usr/local/elk/elklog/apachelog/log1/www.mangocity.com-access_log
cat /dev/null > /usr/local/elk/elklog/nginxlog/log0/m.log
cat /dev/null > /usr/local/elk/elklog/nginxlog/log1/m.log
cat /dev/null > /usr/local/elk/elklog/nginxlog/log0/www1.log
cat /dev/null > /usr/local/elk/elklog/nginxlog/log1/www1.log
cat /dev/null > /usr/local/elk/elklog/nginxlog/log0/flight1.log
cat /dev/null > /usr/local/elk/elklog/nginxlog/log1/flight1.log
