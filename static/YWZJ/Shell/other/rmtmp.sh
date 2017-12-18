#!/bin/bash
prodir=/wasprofiles/c02-`hostname`
tmpdir=/wasprofiles/c02-`hostname`/tmp`date +%Y%m%d%H%M%S`
su - was2 -c "mkdir $tmpdir"
su - was2 -c "mv $prodir/temp $tmpdir"
su - was2 -c "mv $prodir/tranlog $tmpdir"
su - was2 -c "mv $prodir/wstemp $tmpdir"
