#!/bin/bash

[ -d /usr/local/zabbix ] && echo "/usr/local/zabbix exist" && exit
if ps -ef | grep zabbix_agentd | grep -v grep ; then
	echo "zabbix agent is installed"
exit
fi

yum install -y autoconf automake imake libxml2-devel expat-devel cmake gcc gcc-c++ libaio libaio-devel bzr bison libtool ncurses5-devel net-snmp\* libxml2 libxml2-devel bzip2 libpng-devel freetype-devel bzip2-devel curl* curl-devel libjpeg\* openjpeg\*
if [ $? != 0 ] ;then
	echo -e "\033[31mInstall rpm failed\033[0m"
	exit 0
fi

useradd zabbix
cd /tmp
wget http://10.10.45.81:8000/zabbix-3.2.6.tar.gz
tar zvxf zabbix-3.2.6.tar.gz
cd zabbix-3.2.6
./configure --prefix=/usr/local/zabbix --enable-agent --with-mysql --with-net-snmp --with-libcurl --with-libxml2
make
make install

while true
do
	ifconfig
	echo -e "\033[31mPlease input network\033[0m"
	read input
	if ifconfig $input>/dev/null ; then
		ip=`ifconfig $input | grep "inet addr" | awk '{print $2}' | awk -F ':' '{print $2}'`
		echo $ip
		break
	else
		echo -e "\033[31mInput Err\033[0m"
	fi
done

sed -i 's/Server=127.0.0.1/Server=10.10.45.152/g' /usr/local/zabbix/etc/zabbix_agentd.conf
sed -i 's/ServerActive=127.0.0.1/ServerActive=10.10.45.152/g' /usr/local/zabbix/etc/zabbix_agentd.conf
sed -i "s/Hostname=Zabbix server/Hostname=$ip/g" /usr/local/zabbix/etc/zabbix_agentd.conf

echo "------------------------------- show zabbix agent conf file -------------------------------"
awk '/^[^#]/' /usr/local/zabbix/etc/zabbix_agentd.conf
/usr/local/zabbix/sbin/zabbix_agentd
if grep zabbix_agentd /etc/rc.local >/dev/null ;then
	echo -e "\033[31mNo need change rc.local\033[0m"
else 
	echo "/usr/local/zabbix/sbin/zabbix_agentd" >> /etc/rc.local
fi
