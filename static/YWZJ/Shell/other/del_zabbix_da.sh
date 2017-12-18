#!/bin/bash
Date=`date -d $(date -d "-30 day" +%Y%m%d) +%s`
/usr/local/mysql/bin/mysql --login-path=zabbix -e"
use zabbix;
DELETE FROM history WHERE 'clock' < $Date;
optimize table history;
DELETE FROM history_str WHERE 'clock' < $Date;
optimize table history_str;
DELETE FROM history_uint WHERE 'clock' < $Date;
optimize table history_uint;
DELETE FROM  trends WHERE 'clock' < $Date;
optimize table  trends;
DELETE FROM trends_uint WHERE 'clock' < $Date;
optimize table trends_uint;
DELETE FROM events WHERE 'clock' < $Date;
optimize table events;
"
#此脚本删除30天之前的数据,时间可可根据需求自行修改