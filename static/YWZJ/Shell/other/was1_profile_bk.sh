#!/bin/bash
find /log-archive/wasprofilesbk/was1 -name c01-`hostname`.\* -ctime +35 | xargs rm -f 
tar zcvf /log-archive/wasprofilesbk/was1/c01-`hostname`.`date +%Y%m%d%H%M%S`.tar.gz /wasprofiles/c01-`hostname`
