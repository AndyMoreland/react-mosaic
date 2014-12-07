# !/bin/sh
#
# Deploy script
#

correctKey=$(<deployKey.txt)
inputKey=$1

if [ correctKey = inputKey]
	then
		#git pull origin master:master --quiet --progress
		git pull origin master:master --verbose
		exit 0
	else
		echo 'error'
		exit 1
	fi