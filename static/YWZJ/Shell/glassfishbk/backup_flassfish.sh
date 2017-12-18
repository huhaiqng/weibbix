#!/bin/bash
dn=`dirname $0`
cd $dn
awk '/^[^#]/' glassfish.txt | while read line
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
        if ssh $ipa -p 22022 "[[ -d $res ]]" </dev/null ; then            
            ssh $ipa -p 22022 "[[ ! -d /log-archive/glassfishbk ]]&& mkdir -p /log-archive/glassfishbk" </dev/null
            ssh $ipa -p 22022 "tar -zcvf /log-archive/glassfishbk/${name}_${dt}_${ipa}.tar.gz $res" </dev/null
        else
            echo "$res is not exist"
        fi
        i=$(($i+1))
    done
done
