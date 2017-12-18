#!/bin/bash
wasdir01=/wasprofile/c01-`hostname`
wasdri02=/wasprofile/c02-`hostname`
tmpdir01=/tmp/wastmp`date "+%Y%m%d%H%M%S"`/was1
tmpdir02=/tmp/wastmp`date "+%Y%m%d%H%M%S"`/was2

function restart_all
{
    restart_was1
    restart_was2
}

function restart_was1
{
    mkdir -p $tmpdir01
    mv $wasdir01/temp $tmpdir01
    mv $wasdir01/wstemp $tmpdir01
    mv $wasdir01/tranlog $tmpdir01
    ps -ef | grep [j]ava | grep wasprofile | grep was1 | awk '{print $2}' | xargs kill -9
    su - was1 -c "$wasdir01/bin/starNode.sh"
    su - was1 -c "$wasdir01/bin/starServer.sh c01_mbrejb_s01"
    su - was1 -c "$wasdir01/bin/starServer.sh c01_mbrejb_s03"
    su - was1 -c "$wasdir01/bin/starServer.sh c01_mbrejb_s05"
    su - was1 -c "$wasdir01/bin/starServer.sh c01_ulm2_s01"
    su - was1 -c "$wasdir01/bin/starServer.sh c01_ulm_s01"
}

function restart_was2
{
    mkdir -p $tmpdir02
    mv $wasdir02/temp $tmpdir02
    mv $wasdir02/wstemp $tmpdir02
    mv $wasdir02/tranlog $tmpdir02
    ps -ef | grep [j]ava | grep wasprofile | grep was2 | awk '{print $2}' | xargs kill -9
    su - was2 -c "$wasdir02/bin/starNode.sh"
    su - was2 -c "$wasdir02/bin/starServer.sh c02_mbrejb_s01"
    su - was2 -c "$wasdir02/bin/starServer.sh c02_mbrejb_s03"
    su - was2 -c "$wasdir02/bin/starServer.sh c02_mbrejb_s05"
    su - was2 -c "$wasdir02/bin/starServer.sh c02_ulm2_s01"
    su - was2 -c "$wasdir02/bin/starServer.sh c02_ulm_s01"
}

function restart_server
{
    cno=`echo $1 | cut -c 1-3`
    case $cno in
	c01)
	    ps -ef | grep [j]ava | grep $1 | awk '{print $2}' | xargs kill -9
	    sleep 10
            ps -ef | grep [j]ava | grep $1 || su - was1 -c "$wasdir01/bin/starServer.sh $1"
	;;
        c02)
	    ps -ef | grep [j]ava | grep $1 | awk '{print $2}' | xargs kill -9 
            sleep 10
            ps -ef | grep [j]ava | grep $1 || su - was2 -c "$wasdir02/bin/starServer.sh $1" 
	;;
	*)
	    echo "wasserver not exist!!!"
    esac
}

if [ $# -eq 1 ] ; then
    case $1 in
	all)
	    restart_all
	;;
	was1)
	    restart_was1
	;;
	was2)
	    restart_was2
    	;;
	*)
	    restart_server
	;;
    esac	    
else
    echo "command:./restart_was.sh all|was1|was2|wasserver"
fi
