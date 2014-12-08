# !/bin/sh
#
# Deploy script
#

correctKey=$(cat deployKey.txt)
inputKey=$1

if [ $correctKey = $inputKey ]
	then
		cd ../
		git pull origin master:master --quiet --progress
		npm install
		bower update --allow-root
		npm run build
		exit 0
	else
		echo 'Wrong deploy key '
		exit 1
	fi