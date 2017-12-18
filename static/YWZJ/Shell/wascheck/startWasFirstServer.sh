#!/bin/bash
if [ $# -ne 1 ] ; then
    echo "Input Error: Please Input 'sh startWas1FirstServer.sh was1|was2'"
    exit
fi

case $1 in
    was1)
        while read line
        do
            adr=`echo $line | awk '{print $1}'`
            srv=`echo $line | awk '{print $2}'`
            hst=`echo $line | awk '{print $3}'`
            echo "----------------------Starting $hst in $adr!!!----------------------"
            ssh $adr "su - $1 -c '/wasprofiles/c01-${hst}/bin/startServer.sh $srv'" </dev/null
        done < was1_first.txt
    ;;
    was2)
        while read line
        do
            adr=`echo $line | awk '{print $1}'`
            srv=`echo $line | awk '{print $2}'`
            hst=`echo $line | awk '{print $3}'`
            echo "----------------------Starting $hst in $adr!!!----------------------"
            ssh $adr "su - $1 -c '/wasprofiles/c02-${hst}/bin/startServer.sh $srv'" </dev/null
        done < was2_first.txt
    ;;
    *)
        echo "Input Error: Please Input 'sh startWas1FirstServer.sh was1|was2'"
esac
