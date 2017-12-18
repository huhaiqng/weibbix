#!/bin/bash
dn=`dirname $0`
cd $dn
awk '/^[^#]/' log_arg.txt | while read log
do 
    logarr=($log)

    len=${#logarr[@]}
    dir=${logarr[0]}
    fn=${logarr[1]}
    cnt=${logarr[2]}
    dt=${logarr[3]}

    if [ $len != 4 ]; then
        echo "Line \"$log\" is error"
        continue
    fi        

    [[ ! -d $dir ]] && echo "$dir is not exist" && continue
    [[ ! "$cnt" =~ ^[0-9]+$ ]] && echo "$cnt is not a number" && continue
    [[ ! "$dt" =~ ^[0-9]+$ ]] && echo "$dt is not a number" && continue

    acnt=`find $dir -type f -name $fn -ctime -$dt | wc -l`
    echo "$dir $acnt $cnt"
    if [ $acnt -ge $cnt ] ; then
        echo "Now delete $dt days ago logs in $dir. Log files $fn not less than $cnt."
        find $dir -type f -name $fn -ctime +$dt | xargs rm -f
    fi
done
