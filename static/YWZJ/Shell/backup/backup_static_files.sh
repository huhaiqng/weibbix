#!/bin/bash
dn=`dirname $0`
cd $dn
awk '/^[^#]/' rsync_dir.txt | while read line
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
        echo "-----------------------$ipa:$res-----------------------"
        if ssh $ipa "[[ -d $res ]]" </dev/null ; then
            dir=/backup_static_files/`date '+%Y%m'`/${ipa}${res}
            [[ ! -d $dir ]] && mkdir -pv $dir            
            rsync -auvrtzopgP --progress -e ssh $ipa:$res/ $dir
        elif ssh $ipa "[[ -f $res ]]" </dev/null ; then
            dir=/backup_static_files/`date '+%Y%m'`/${ipa}`dirname $res`
            [[ ! -d $dir ]] && mkdir -pv $dir
            rsync -auvrtzopgP --progress -e ssh $ipa:$res $dir
        else
            echo "$res is not exist"
        fi
        i=$(($i+1))
    done
done
