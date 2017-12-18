#!/bin/bash
locdir1=/usr/local/elk/elklog/nginxlog/log0
locdir2=/usr/local/elk/elklog/nginxlog/log1

#get uSG_gateway.log
uSG_gateway_log=$locdir1/uSG_gateway.log
rsync -auvrtzopgP --progress -e ssh root@10.10.130.58:/data/logs/uSG-gateway.log ${uSG_gateway_log}
[ -f ${uSG_gateway_log}.old ] || touch ${uSG_gateway_log}.old
n=`wc -l ${uSG_gateway_log}.old | awk '{print $1}'`
m=`wc -l ${uSG_gateway_log} | awk '{print $1}'`
cp ${uSG_gateway_log} ${uSG_gateway_log}.old
for ((i=$n+1;i<=$m;i++))
do
    num=$[i]p
    cmd="sed -n $num ${uSG_gateway_log}"
    $cmd>>$locdir1/uSG_gateway_elk.log
done

#get uSG_website.log
uSG_website_log=$locdir1/uSG_website.log
rsync -auvrtzopgP --progress -e ssh root@10.10.130.58:/data/logs/uSG-website.log ${uSG_website_log}
[ -f ${uSG_website_log}.old ] || touch ${uSG_website_log}.old
n=`wc -l ${uSG_website_log}.old | awk '{print $1}'`
m=`wc -l ${uSG_website_log} | awk '{print $1}'`
cp ${uSG_website_log} ${uSG_website_log}.old
for ((i=$n+1;i<=$m;i++))
do
    num=$[i]p
    cmd="sed -n $num ${uSG_website_log}"
    $cmd>>$locdir1/uSG_website_elk.log
done
