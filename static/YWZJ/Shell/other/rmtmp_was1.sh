#!/bin/bash
prodir=/wasprofiles/c01-`hostname`
tmpdir=/wasprofiles/c01-`hostname`/tmp`date +%Y%m%d%H%M%S`
mkdir $tmpdir
mv $prodir/temp $tmpdir
mv $prodir/tranlog $tmpdir
mv $prodir/wstemp $tmpdir
