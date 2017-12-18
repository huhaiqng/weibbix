#!/bin/bash
cat tomcat.txt | while read line
do
    i=1
    dirarr=($line)
    len=${#dirarr[@]}
    if [ $len -gt 1 ] ; then
        ipa=${dirarr[0]}
        if ping -c 2 $ipa >/dev/null ;then
            echo "$ipa is alive"
        else
            echo "$ipa is not alive"
	    continue
        fi
    else
        echo "input \'$line\' is error"
        continue
    fi

    while [ $i -lt $len ]
    do
        res=${dirarr[$i]}
	name=`basename $res`
        dt=`date +%d`
        if ssh $ipa "[[ -d $res ]]" </dev/null ; then
            ssh $ipa "[[ ! -d /tmp/$ipa ]]&& mkdir /tmp/$ipa"
            ssh $ipa "tar -zcvf /tmp/$ipa/${name}.${dt}.tar.gz $res"
        else
            echo "$res is not exist"
        fi
        i=$(($i+1))
    done
done
