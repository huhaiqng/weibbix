#!/bin/bash
locdir1=/usr/local/elk/elklog/nginxlog/log0
locdir2=/usr/local/elk/elklog/nginxlog/log1

#get www1.mangocity.com access log
www1_log1=$locdir1/www1.mangocity.com-access_log
rsync -auvrtzopgP --progress -e ssh root@10.10.130.231:/data/logs/www1.mangocity.com-access_log $www1_log1
[ -f $www1_log1.old ] || touch $www1_log1.old
n=`wc -l $www1_log1.old | awk '{print $1}'`
m=`wc -l $www1_log1 | awk '{print $1}'`
cp $www1_log1 $www1_log1.old
for ((i=$n+1;i<=$m;i++))
do
    num=$[i]p
    cmd="sed -n $num $www1_log1"
    $cmd>>$locdir1/www1.log
done

www1_log2=$locdir2/www1.mangocity.com-access_log
rsync -auvrtzopgP --progress -e ssh root@10.10.130.232:/data/logs/www1.mangocity.com-access_log $www1_log2
[ -f $www1_log2.old ] || touch $www1_log2.old
n=`wc -l $www1_log2.old | awk '{print $1}'`
m=`wc -l $www1_log2 | awk '{print $1}'`
cp $www1_log2 $www1_log2.old
for ((i=$n+1;i<=$m;i++))
do
    num=$[i]p
    cmd="sed -n $num $www1_log2"
    $cmd>>$locdir2/www1.log
done

#get flight1.mangocity.com access log
flight1_log1=$locdir1/flight1-access_log
rsync -auvrtzopgP --progress -e ssh root@10.10.130.231:/data/logs/flight1-access_log  $flight1_log1
[ -f $flight1_log1.old ] || touch $flight1_log1.old
n=`wc -l $flight1_log1.old | awk '{print $1}'`
m=`wc -l $flight1_log1 | awk '{print $1}'`
cp $flight1_log1 $flight1_log1.old
for ((i=$n+1;i<=$m;i++))
do
    num=$[i]p
    cmd="sed -n $num $flight1_log1"
    $cmd>>$locdir1/flight1.log
done

flight1_log2=$locdir2/flight1-access_log
rsync -auvrtzopgP --progress -e ssh root@10.10.130.232:/data/logs/flight1-access_log  $flight1_log2
[ -f $flight1_log2.old ] || touch $flight1_log2.old
n=`wc -l $flight1_log2.old | awk '{print $1}'`
m=`wc -l $flight1_log2 | awk '{print $1}'`
cp $flight1_log2 $flight1_log2.old
for ((i=$n+1;i<=$m;i++))
do
    num=$[i]p
    cmd="sed -n $num $flight1_log2"
    $cmd>>$locdir2/flight1.log
done

#get m.mangocity.com access log
locdir1=/usr/local/elk/elklog/nginxlog/log0
m_log1=$locdir1/m.mangocity.com-access_log
rsync -auvrtzopgP --progress -e ssh root@10.10.130.58:/data/logs/uSG-website.log $m_log1
[ -f $m_log1.old ] || touch $m_log1.old
n=`wc -l $m_log1.old | awk '{print $1}'`
m=`wc -l $m_log1 | awk '{print $1}'`
cp $m_log1 $m_log1.old
for ((i=$n+1;i<=$m;i++))
do
    num=$[i]p
    cmd="sed -n $num $m_log1"
    $cmd>>$locdir1/m.log
done

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
