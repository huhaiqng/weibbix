#!/bin/bash
user=`whoami`
case $user in
    was1)
        prodir=/wasprofiles/c01-`hostname`
        tmpdir=/tmp/was1/tmp`date +%Y%m%d%H%M%S`
        mkdir -p $tmpdir
        [[ -d $prodir/temp ]] && mv $prodir/temp $tmpdir
        [[ -d $prodir/tranlog ]] && mv $prodir/tranlog $tmpdir
        [[ -d $prodir/wstemp ]] && mv $prodir/wstemp $tmpdir
        echo "Temp files in $prodir is removed!"
        ls -l $tmpdir
    ;;
    was2)
        echo was2
    ;;
    *)
        echo "User Error:User Must WAS1 OR WAS2!"
    ;;
esac
