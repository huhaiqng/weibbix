#!/bin/bash
dir1=/wasprofiles/c01-`hostname`/installedApps/cell01
dir2=/wasprofiles/c02-`hostname`/installedApps/cell02

function del_files
{
    i=1
    echo "----------------------------------------------------------------------"

    arr=($1)
    for s in ${arr[@]}
    do
        echo "$i $s"
        i=$[$i + 1]
    done
    
    echo "----------------------------------------------------------------------"
    echo "Choose files to remove.(Example:1 2 3 or all)"
    read rmfiles
    while test -z "$rmfiles"
    do
        echo "Input is null! Please input again.(Example:1 2 3 or all)"
        read rmfiles
    done
    echo "----------------------------------------------------------------------"

    if [ "$rmfiles" = "all" ] ; then
        for rf in ${arr[@]}
        do
	    [ ! -d /tmp/$2 ] && mkdir /tmp/$2
	    rmname=`sed 's/\///' <<< "$rf" | sed 's/\//#/g'`
            mv $rf /tmp/$2/$rmname
	done
    else
        for rf in $rmfiles
        do
            if grep '^[[:digit:]]*$' <<< "$rf" >/dev/null ; then
	        arf=$[$rf - 1]
	        if test -z ${arr[$arf]} ; then
		    echo "Eeror: Input $rf not exist"
	        else
                    [ ! -d /tmp/$2 ] && mkdir /tmp/$2
		    rmname=`sed 's/\///' <<< "${arr[$arf]}" | sed 's/\//#/g'`
                    mv ${arr[$arf]} /tmp/$2/$rmname
	        fi
            else
                echo "Eerror: Input $rf is not number."
            fi
        done
    fi
    [ -d /tmp/$2 ] && echo "ls /tmp/$2" && ls -l /tmp/$2
}

echo "Please input was1,was2 or exit."
read line
while test -z "$line" || ([ "$line" != "was1" ] &&  [ "$line" != "was2" ] && [ "$line" != "exit" ])
do
    echo "Input error! Please input was1,was2 or exit."
    read line
done
echo "----------------------------------------------------------------------"

if [ $line = "was1" ] ; then
    echo "Files will be found in $dir1"
    echo "Please input filename.(Example: abc 123.txt)"
    read filename
    while test -z "$filename"
    do
        echo "Input is null! Please input again.(Example: abc 123.txt)"
        read filename
    done

    for file in $filename
    do
        ffile=`find $dir1 -type f -name $file\*`
        if test -z "$ffile" ; then
            echo "Info: $file is not found."
        else
            ffiles="$ffile $ffiles"
        fi
    done
    if test -z "$ffiles" ; then
        echo "Can't find input files."
    else
        del_files "$ffiles" was1
    fi
elif [ $line = "was2" ] ; then
        echo "Files will be found in $dir2"
    echo "Please input filename.(Example: abc 123.txt)"
    read filename
    while test -z "$filename"
    do
        echo "Input is null! Please input again.(Example: abc 123.txt)"
        read filename
    done
    for file in $filename
    do
        ffile=`find $dir2 -type f -name $file\*`
        if test -z "$ffile" ; then
            echo "Info: $file is not found."
        else
            ffiles="$ffile $ffiles"
        fi
    done
    if test -z "$ffiles" ; then
        echo "Info: All input files not found!"
    else
        del_files "$ffiles" was2
    fi
elif [ $line = "exit" ] ; then
    exit
fi
