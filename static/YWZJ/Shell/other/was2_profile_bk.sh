#!/bin/bash
find /log-archive/wasprofilesbk/was2 -name c02-`hostname`.\* -ctime +35 | xargs rm -f 
tar zcvf /log-archive/wasprofilesbk/was2/c02-`hostname`.`date +%Y%m%d%H%M%S`.tar.gz /wasprofiles/c02-`hostname`
