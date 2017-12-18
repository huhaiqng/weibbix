#!/bin/bash
# delete old log
find /usr/local/elk/elklog/apachelog/log0 -type f -cmin +30 | xargs rm -f
find /usr/local/elk/elklog/apachelog/log1 -type f -cmin +30 | xargs rm -f

# get www.mangocity.com log
for f1 in `ssh root@10.10.130.41 find /etc/httpd/logs/ -type f -name www.mangocity.com-access_log\* -cmin -1`
do
	dir1=`echo $f1 | awk -F '/' '{print $NF}'`
	if [ -f /usr/local/elk/elklog/apachelog/log0/$dir1 ] ; then
		n=`wc -l /usr/local/elk/elklog/apachelog/log0/$dir1.old | awk '{print $1}'`
		rsync -auvrtzopgP --progress -e ssh root@10.10.130.41:$f1 /usr/local/elk/elklog/apachelog/log0/
		cp /usr/local/elk/elklog/apachelog/log0/$dir1 /usr/local/elk/elklog/apachelog/log0/$dir1.old
                m=`wc -l /usr/local/elk/elklog/apachelog/log0/$dir1 | awk '{print $1}'`
                for ((i=$n+1;i<=$m;i++))
		do 
 		 	num=$[i]p
                    	cmd="sed -n $num /usr/local/elk/elklog/apachelog/log0/$dir1"
                   	$cmd>>/usr/local/elk/elklog/apachelog/log0/www.mangocity.com-access_log
                done
	else
	        rsync -auvrtzopgP --progress -e ssh root@10.10.130.41:$f1 /usr/local/elk/elklog/apachelog/log0/
		cp /usr/local/elk/elklog/apachelog/log0/$dir1 /usr/local/elk/elklog/apachelog/log0/$dir1.old
		cat /usr/local/elk/elklog/apachelog/log0/$dir1 >>/usr/local/elk/elklog/apachelog/log0/www.mangocity.com-access_log
	fi
done

for f2 in `ssh root@10.10.130.42 find /etc/httpd/logs/ -type f -name www.mangocity.com-access_log\* -cmin -1`
do
        dir2=`echo $f2 | awk -F '/' '{print $NF}'`
        if [ -f /usr/local/elk/elklog/apachelog/log1/$dir2 ] ; then
                n=`wc -l /usr/local/elk/elklog/apachelog/log1/$dir2.old | awk '{print $1}'`
                rsync -auvrtzopgP --progress -e ssh root@10.10.130.42:$f2 /usr/local/elk/elklog/apachelog/log1/
                cp /usr/local/elk/elklog/apachelog/log1/$dir2 /usr/local/elk/elklog/apachelog/log1/$dir2.old
                m=`wc -l /usr/local/elk/elklog/apachelog/log1/$dir2 | awk '{print $1}'`
                echo "n:$n m:$m"
                for ((i=$n+1;i<=$m;i++))
                do
                        echo "n:$n m:$m i:$i"
                        num=$[i]p
                        cmd="sed -n $num /usr/local/elk/elklog/apachelog/log1/$dir2"
                        $cmd>>/usr/local/elk/elklog/apachelog/log1/www.mangocity.com-access_log
                done
        else
                rsync -auvrtzopgP --progress -e ssh root@10.10.130.42:$f2 /usr/local/elk/elklog/apachelog/log1/
                cp /usr/local/elk/elklog/apachelog/log1/$dir2 /usr/local/elk/elklog/apachelog/log1/$dir2.old
                cat /usr/local/elk/elklog/apachelog/log1/$dir2 >>/usr/local/elk/elklog/apachelog/log1/www.mangocity.com-access_log
        fi
done

# get ro.mangocity.com log
for f1 in `ssh root@10.10.5.155 find /etc/httpd/logs/ -type f -name ro.mangocity.com-access_log\* -cmin -1`
do
        ro1=`echo $f1 | awk -F '/' '{print $NF}'`
        if [ -f /usr/local/elk/elklog/apachelog/log0/$ro1 ] ; then
                n=`wc -l /usr/local/elk/elklog/apachelog/log0/$ro1.old | awk '{print $1}'`
                rsync -auvrtzopgP --progress -e ssh root@10.10.5.155:$f1 /usr/local/elk/elklog/apachelog/log0/
                cp /usr/local/elk/elklog/apachelog/log0/$ro1 /usr/local/elk/elklog/apachelog/log0/$ro1.old
                m=`wc -l /usr/local/elk/elklog/apachelog/log0/$ro1 | awk '{print $1}'`
                for ((i=$n+1;i<=$m;i++))
                do
                        num=$[i]p
                        cmd="sed -n $num /usr/local/elk/elklog/apachelog/log0/$ro1"
                        $cmd>>/usr/local/elk/elklog/apachelog/log0/ro.mangocity.com-access_log
                done
        else
                rsync -auvrtzopgP --progress -e ssh root@10.10.5.155:$f1 /usr/local/elk/elklog/apachelog/log0/
                cp /usr/local/elk/elklog/apachelog/log0/$ro1 /usr/local/elk/elklog/apachelog/log0/$ro1.old
                cat /usr/local/elk/elklog/apachelog/log0/$ro1 >>/usr/local/elk/elklog/apachelog/log0/ro.mangocity.com-access_log
        fi
done

for f2 in `ssh root@10.10.5.156 find /etc/httpd/logs/ -type f -name ro.mangocity.com-access_log\* -cmin -1`
do
        ro2=`echo $f2 | awk -F '/' '{print $NF}'`
        if [ -f /usr/local/elk/elklog/apachelog/log1/$ro2 ] ; then
                n=`wc -l /usr/local/elk/elklog/apachelog/log1/$ro2.old | awk '{print $1}'`
                rsync -auvrtzopgP --progress -e ssh root@10.10.5.156:$f2 /usr/local/elk/elklog/apachelog/log1/
                cp /usr/local/elk/elklog/apachelog/log1/$ro2 /usr/local/elk/elklog/apachelog/log1/$ro2.old
                m=`wc -l /usr/local/elk/elklog/apachelog/log1/$ro2 | awk '{print $1}'`
                for ((i=$n+1;i<=$m;i++))
                do
                        num=$[i]p
                        cmd="sed -n $num /usr/local/elk/elklog/apachelog/log1/$ro2"
                        $cmd>>/usr/local/elk/elklog/apachelog/log1/ro.mangocity.com-access_log
                done
        else
                rsync -auvrtzopgP --progress -e ssh root@10.10.5.156:$f2 /usr/local/elk/elklog/apachelog/log1/
                cp /usr/local/elk/elklog/apachelog/log1/$ro2 /usr/local/elk/elklog/apachelog/log1/$ro2.old
                cat /usr/local/elk/elklog/apachelog/log1/$ro2 >>/usr/local/elk/elklog/apachelog/log1/ro.mangocity.com-access_log
        fi
done
